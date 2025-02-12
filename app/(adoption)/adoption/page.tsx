"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
								<StepLabel sx={{ fontSize: "90px" }} {...labelProps}>
									{label}
								</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<>
						<Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>

						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</>
				) : (
					<>
						{activeStep === 0 && (
							<>
								<Typography sx={{ mt: 2, mb: 1, mx: 4 }}>Step {activeStep + 1}</Typography>
								<Dogs addDog={addDog} removeDog={removeDog} selectedDogs={selectedDogIds} />
							</>
						)}

						{activeStep === 1 && (
							<>
								<Typography sx={{ mt: 2, mb: 1, mx: 4 }}>Step {activeStep + 1}</Typography>
								<SelectedDogs
									addDog={addDog}
									removeDog={removeDog}
									clearDogs={clearDogs}
									selectedDogIds={selectedDogIds}
								/>
							</>
						)}

						{activeStep === 2 && <Match selectedDogIds={selectedDogIds} />}

						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								style={{ fontSize: "20px" }}
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button style={{ fontSize: "20px" }} onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</Button>
						</Box>
					</>
				)}
			</Box>
		</div>
	);
}

export default Adoption;
