import { useEffect, useState } from "react";
import { Dog } from "./dogs";
import { Box, Grid2 } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface Match {
	match: string;
}

function Match({ selectedDogIds }: { selectedDogIds: string[] }) {
	const [loading, setLoading] = useState(true);
	const [matchedDog, setMatchedDog] = useState<Dog | undefined>(undefined);

	useEffect(() => {
		async function fetchDogs() {
			const matchedDogRes = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
				method: "POST",
				credentials: "include",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(selectedDogIds),
			});

			const matchedDogId: Match = await matchedDogRes.json();

			const dogsRes = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
				method: "POST",
				credentials: "include",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify([matchedDogId.match]),
			});

			const dogs: Dog[] = await dogsRes.json();

			setMatchedDog(dogs[0]);
			setLoading(false);
		}
		fetchDogs();
	}, [selectedDogIds]);

	return (
		<>
			{loading ? (
				<div className="flex justify-center mt-16">
					<h1 className="text-3xl">Loading...</h1>
				</div>
			) : (
				<div className="w-full">
					<div className="flex justify-center  md:h-[600px]">
						<Image
							className="self-center h-auto w-auto max-h-[600px]"
							src={matchedDog?.img || "/dog.svg"}
							alt={matchedDog?.name || "dog"}
							width="450"
							height="400"
						/>
					</div>
					<div className="flex justify-between mx-16 mt-3">
						<h1 className="text-3xl mt-3">{matchedDog?.name}</h1>
					</div>
					<div className="flex-col xl:flex xl:flex-row xl:justify-between mx-16">
						<p className="text-2xl">
							<CalendarMonthIcon className="mb-1 me-1" />
							{matchedDog?.age} {matchedDog!.age > 1 ? "years" : "year"}
						</p>
						<p className="text-2xl">
							<LocationOnIcon className="mb-1 me-1" />
							{matchedDog?.zip_code}
						</p>
						<p className="text-2xl">
							<PetsIcon className="mb-1 me-1" />
							{matchedDog?.breed}
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default Match;
