"use client";

import Image from "next/image";
import { Box, Grid2, TablePagination } from "@mui/material";
import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { redirect } from "next/navigation";
import Filter from "./filter";

interface PagedData {
	next: string;
	resultIds: string[];
	total: number;
}

interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

interface DogPaged {
	next: string;
	dogs: Dog[];
	total: number;
}

function Dogs() {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(12);
	const [dogPaged, setDogPaged] = useState<DogPaged | null>(null);
	const [ageMinFilter, setAgeMinFilter] = useState<number | string>("");
	const [ageMaxFilter, setAgeMaxFilter] = useState<number | string>("");
	const [breedsFilter, setBreedsFilter] = useState<string[]>([]);
	const [zipCodeFilter, setZipCodeFilter] = useState<string>("");

	const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeItemsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filterChange = (minAge: number | string, maxAge: number | string, breeds: string[], zipCode: string) => {
		setAgeMinFilter(minAge);
		setAgeMaxFilter(maxAge);
		setBreedsFilter(breeds);
		setZipCodeFilter(zipCode);
	};

	useEffect(() => {
		async function fetchDogs() {
			const url = new URL("https://frontend-take-home-service.fetch.com/dogs/search");
			url.searchParams.append("size", itemsPerPage.toString());
			url.searchParams.append("from", (itemsPerPage * page).toString());

			if (ageMinFilter) {
				url.searchParams.append("ageMin", ageMinFilter.toString());
			}

			if (ageMaxFilter) {
				url.searchParams.append("ageMax", ageMaxFilter.toString());
			}

			if (breedsFilter.length) {
				breedsFilter.forEach((breed) => {
					url.searchParams.append("breeds", breed);
				});
			}

			if (zipCodeFilter) {
				url.searchParams.append("zipCodes", zipCodeFilter);
			}

			const dogPagedRes = await fetch(url, {
				method: "GET",
				credentials: "include",
			});
			if (dogPagedRes.status === 401) {
				redirect("/");
			}
			const pagedData: PagedData = await dogPagedRes.json();

			const dogsRes = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
				method: "POST",
				credentials: "include",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(pagedData.resultIds),
			});

			const dogs = await dogsRes.json();

			const result: DogPaged = {
				next: pagedData.next,
				dogs: dogs,
				total: pagedData.total,
			};

			setDogPaged(result);
		}
		fetchDogs();
	}, [page, itemsPerPage, ageMinFilter, ageMaxFilter, breedsFilter, zipCodeFilter]);

	return (
		<div className="w-full">
			<div className="flex justify-end">
				<Filter filterChange={filterChange} />
			</div>
			<Box sx={{ flexGrow: 1 }}>
				<Grid2 className="m-2" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}>
					{dogPaged?.dogs.map((dog) => (
						<Grid2 key={dog.id} size={{ xs: 4, sm: 4, md: 4, lg: 4 }} className="">
							<div className="flex justify-center sm:h-[400px] md:h-[600px]">
								<Image className="self-center max-h-[600px]" src={dog.img} alt={dog.name} width="450" height="400" />
							</div>
							<h1 className="text-3xl mt-3 mx-16">{dog.name}</h1>
							<div className="flex-col xl:flex xl:flex-row xl:justify-between mx-16">
								<p className="text-2xl">
									<CalendarMonthIcon className="mb-1 me-1" />
									{dog.age} {dog.age > 1 ? "years" : "year"}
								</p>
								<p className="text-2xl">
									<LocationOnIcon className="mb-1 me-1" />
									{dog.zip_code}
								</p>
								<p className="text-2xl">
									<PetsIcon className="mb-1 me-1" />
									{dog.breed}
								</p>
							</div>
						</Grid2>
					))}
				</Grid2>
			</Box>
			<TablePagination
				component="div"
				count={dogPaged?.total || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={itemsPerPage}
				onRowsPerPageChange={handleChangeItemsPerPage}
				labelRowsPerPage="Dogs per page"
				showFirstButton={true}
				showLastButton={true}
				rowsPerPageOptions={[12, 24, 48]}
			/>
		</div>
	);
}

export default Dogs;
