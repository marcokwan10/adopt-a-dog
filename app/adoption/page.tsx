"use client";

import { useEffect, useState } from "react";

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

function Adoption() {
	const [dogPaged, setDogPaged] = useState<DogPaged | null>(null);

	useEffect(() => {
		async function fetchDogs() {
			const dogPagedRes = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", {
				method: "GET",
				credentials: "include",
			});
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
	}, []);

	return (
		<>
			{dogPaged?.dogs.map((dog: Dog) => (
				<div key={dog.id} className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">{dog.name}</h2>
					</div>
				</div>
			))}
		</>
	);
}

export default Adoption;
