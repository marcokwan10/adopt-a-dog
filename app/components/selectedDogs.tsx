"use client";

import { Box, Grid2, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Dog } from "@/app/components/dogs";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function SelectedDogs({
	selectedDogIds,
	addDog,
	removeDog,
	clearDogs,
}: {
	selectedDogIds: string[];
	addDog: (dogId: string) => void;
	removeDog: (dogId: string) => void;
	clearDogs: () => void;
}) {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDogs() {
			const dogsRes = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
				method: "POST",
				credentials: "include",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(selectedDogIds),
			});

			const dogs: Dog[] = await dogsRes.json();

			setDogs(dogs);
			setLoading(false);
		}
		fetchDogs();
	}, [selectedDogIds]);

	return (
		<>
			{loading && (
				<div className="flex justify-center mt-16">
					<h1 className="text-3xl">Loading...</h1>
				</div>
			)}
			{selectedDogIds.length === 0 ? (
				<div className="flex justify-center mt-16">
					<h1 className="text-3xl">No dogs selected yet!</h1>
				</div>
			) : (
				<div className="w-full">
					<div className="flex justify-end">
						<Button style={{ fontSize: "20px" }} startIcon={<DeleteForeverIcon />} onClick={clearDogs}>
							Clear All
						</Button>
					</div>
					<Box sx={{ flexGrow: 1 }}>
						<Grid2 className="m-2" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}>
							{dogs.map((dog) => (
								<Grid2 key={dog.id} size={{ xs: 4, sm: 4, md: 4, lg: 4 }} className="">
									<div className="flex justify-center  md:h-[600px]">
										<Image
											className="self-center h-fit max-h-[600px]"
											src={dog.img}
											alt={dog.name}
											width="450"
											height="400"
										/>
									</div>
									<div className="flex justify-between mx-16 mt-3">
										<h1 className="text-3xl mt-3">{dog.name}</h1>
										{selectedDogIds.includes(dog.id) ? (
											<Button variant="outlined" startIcon={<RemoveIcon />} onClick={() => removeDog(dog.id)}>
												Remove
											</Button>
										) : (
											<Button variant="outlined" startIcon={<AddIcon />} onClick={() => addDog(dog.id)}>
												Add
											</Button>
										)}
									</div>
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
				</div>
			)}
		</>
	);
}

export default SelectedDogs;
