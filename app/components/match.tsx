import { useEffect, useState } from "react";
import { Dog } from "./dogs";
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
				<div className="w-full flex flex-col items-center m-7">
					<Image
						className="self-center  "
						src={matchedDog?.img || "/paw.svg"}
						alt={matchedDog?.name || "dog"}
						width="650"
						height="800"
					/>
					<h1 className="text-5xl mt-4">{matchedDog?.name}</h1>
					<div className="mt-4 w-[40%] flex justify-between ">
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
