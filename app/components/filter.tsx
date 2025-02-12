"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FormEvent, useEffect, useState } from "react";
import { FormControl, InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function DialogSelect({
	filterChange,
}: {
	filterChange: (minAge: number | string, maxAge: number | string, breeds: string[], sortBy: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [breeds, setBreeds] = useState<string[]>([]);
	const [breedsFilter, setBreedsFilter] = useState<string[]>([]);
	const [ageMinFilter, setAgeMinFilter] = useState<number | string>("");
	const [ageMaxFilter, setAgeMaxFilter] = useState<number | string>("");
	const [sortBy, setSortBy] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const clearFilter = () => {
		setBreedsFilter([]);
		setAgeMinFilter("");
		setAgeMaxFilter("");
		setSortBy("");
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		filterChange(ageMinFilter, ageMaxFilter, breedsFilter, sortBy);
		setOpen(false);
	};

	useEffect(() => {
		async function fetchBreeds() {
			const breedsRes = await fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
				method: "GET",
				credentials: "include",
			});
			const breeds = await breedsRes.json();
			setBreeds(breeds);
		}
		fetchBreeds();
	}, []);

	return (
		<>
			<Button style={{ fontSize: "20px" }} startIcon={<FilterListIcon />} onClick={handleClickOpen}>
				Filter
			</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Filter</DialogTitle>

				<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }} onSubmit={handleSubmit} noValidate>
					<DialogContent>
						<TextField
							sx={{ m: 1, minWidth: 180 }}
							label="Age Min"
							select
							value={ageMinFilter}
							error={ageMaxFilter !== "" && ageMinFilter > ageMaxFilter}
							onChange={(event) => {
								setAgeMinFilter(event.target.value);
								if (ageMaxFilter !== "" && event.target.value > ageMaxFilter) setError(true);
								else setError(false);
							}}
						>
							<MenuItem value="">-</MenuItem>
							{Array.from({ length: 15 }, (_, i) => i + 1).map((age) => (
								<MenuItem key={age} value={age}>
									{age}
								</MenuItem>
							))}
						</TextField>

						<TextField
							sx={{ m: 1, minWidth: 180 }}
							select
							label="Age Max"
							value={ageMaxFilter}
							error={ageMaxFilter !== "" && ageMaxFilter < ageMinFilter}
							onChange={(event) => {
								setAgeMaxFilter(event.target.value);
								if (ageMaxFilter !== "" && event.target.value < ageMinFilter) setError(true);
								else setError(false);
							}}
						>
							<MenuItem value="">-</MenuItem>
							{Array.from({ length: 15 }, (_, i) => i + 1).map((age) => (
								<MenuItem key={age} value={age}>
									{age}
								</MenuItem>
							))}
						</TextField>

						<FormControl sx={{ m: 1, width: 400 }}>
							<InputLabel>Breeds</InputLabel>
							<Select
								multiple
								value={breedsFilter}
								onChange={(event: SelectChangeEvent<typeof breedsFilter>) => {
									const {
										target: { value },
									} = event;

									setBreedsFilter(typeof value === "string" ? value.split(",") : value);
								}}
							>
								{breeds.map((breed) => (
									<MenuItem key={breed} value={breed}>
										{breed}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							sx={{ m: 1, minWidth: 180 }}
							select
							label="Sort By"
							value={sortBy}
							onChange={(event) => setSortBy(event.target.value)}
						>
							<MenuItem value="">-</MenuItem>
							<MenuItem value="breed:asc">Breed ⬆︎</MenuItem>
							<MenuItem value="breed:desc">Breed ⬇︎</MenuItem>
							<MenuItem value="name:asc">Name ⬆︎</MenuItem>
							<MenuItem value="name:desc">Name ⬇︎</MenuItem>
							<MenuItem value="age:asc">Age ⬆︎</MenuItem>
							<MenuItem value="age:desc">Age ⬇︎</MenuItem>
						</TextField>

						<div className="flex justify-between">
							<Button onClick={handleClose}>Cancel</Button>
							<div>
								<Button onClick={clearFilter}>Clear</Button>
								<Button disabled={error} type="submit">
									Apply
								</Button>
							</div>
						</div>
					</DialogContent>
				</Box>
			</Dialog>
		</>
	);
}
