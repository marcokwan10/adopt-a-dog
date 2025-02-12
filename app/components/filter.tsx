"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FormEvent, useEffect, useState } from "react";
import { FormControl, InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function DialogSelect({
	filterChange,
}: {
	filterChange: (minAge: number | string, maxAge: number | string, breeds: string[], zipCodes: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [breeds, setBreeds] = useState<string[]>([]);
	const [breedsFilter, setBreedsFilter] = useState<string[]>([]);
	const [ageMinFilter, setAgeMinFilter] = useState<number | string>("");
	const [ageMaxFilter, setAgeMaxFilter] = useState<number | string>("");
	const [zipCode, setZipCode] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setBreedsFilter([]);
		setAgeMinFilter("");
		setAgeMaxFilter("");
		setZipCode("");
		setOpen(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		filterChange(ageMinFilter, ageMaxFilter, breedsFilter, zipCode);
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

									setBreedsFilter(
										// On autofill we get a stringified value.
										typeof value === "string" ? value.split(",") : value
									);
								}}
								// input={<OutlinedInput label="Name" />}
								// MenuProps={MenuProps}
							>
								{breeds.map((breed) => (
									<MenuItem key={breed} value={breed}>
										{breed}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							sx={{ m: 1, minWidth: 300 }}
							label="Zip Code"
							value={zipCode}
							onChange={(event) => setZipCode(event.target.value)}
						/>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button disabled={error} type="submit">
								Apply
							</Button>
						</DialogActions>
					</DialogContent>
				</Box>
			</Dialog>
		</>
	);
}
