"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dogs from "@/app/components/dogs";

function Adoption() {
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
						<Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
						<Dogs />

						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</>
				) : (
					<>
						<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
						<Dogs />
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
						</Box>
					</>
				)}
			</Box>
		</div>
	);
}

export default Adoption;
