"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Dogs from "@/app/components/dogs";
import SelectedDogs from "@/app/components/selectedDogs";
import Match from "@/app/components/match";

function Adoption() {
	const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);

	const steps = ["Select dogs", "Finalize your list", "See your match!"];

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setSelectedDogIds([]);
		setActiveStep(0);
	};

	const addDog = (dogId: string) => {
		setSelectedDogIds([...selectedDogIds, dogId]);
	};

	const removeDog = (dogId: string) => {
		setSelectedDogIds(selectedDogIds.filter((id) => id !== dogId));
	};

	const clearDogs = () => {
		setSelectedDogIds([]);
	};

	return (
		<div className="w-[100%] p-24">
			<Box sx={{ width: "100%" }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<>
						<h1 className="text-3xl m-5">All steps completed!</h1>

						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button style={{ fontSize: "20px" }} onClick={handleReset}>
								Reset
							</Button>
						</Box>
					</>
				) : (
					<>
						{activeStep === 0 && (
							<>
								<Dogs addDog={addDog} removeDog={removeDog} selectedDogs={selectedDogIds} />
							</>
						)}

						{activeStep === 1 && (
							<>
								<SelectedDogs
									addDog={addDog}
									removeDog={removeDog}
									clearDogs={clearDogs}
									selectedDogIds={selectedDogIds}
								/>
							</>
						)}

						{activeStep === 2 && (
							<>
								<Match selectedDogIds={selectedDogIds} />
							</>
						)}

						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							{activeStep > 0 && (
								<Button
									style={{ fontSize: "20px" }}
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Back
								</Button>
							)}
							<Box sx={{ flex: "1 1 auto" }} />

							{activeStep === 0 && (
								<Button style={{ fontSize: "20px" }} onClick={handleNext}>
									Next
								</Button>
							)}
							{activeStep === 1 && (
								<Button disabled={selectedDogIds.length === 0} style={{ fontSize: "20px" }} onClick={handleNext}>
									Match
								</Button>
							)}
							{activeStep === 2 && (
								<Button style={{ fontSize: "20px" }} onClick={handleNext}>
									Finish
								</Button>
							)}
						</Box>
					</>
				)}
			</Box>
		</div>
	);
}

export default Adoption;
