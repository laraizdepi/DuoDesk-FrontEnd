import React from "react";
import { Steps, ButtonGroup, Button, Form, Input } from 'rsuite';
import { Container } from 'react-bootstrap';

import StepOne from "./StepOne";

const RegisterSteps = () => {

	const [step, setStep] = React.useState(0);
	const onChange = (nextStep: React.SetStateAction<number>) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
	};
	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	return (
		<Container>
			<Steps current={step}>
				<Steps.Item title="Informacion basica" />
				<Steps.Item title="Espacios" />
				<Steps.Item title="Amenidades" />
				<Steps.Item title="Confirm" />
			</Steps>
			<hr/>
			<Form>
				<StepOne />				
			</Form>
			<hr/>
			{/* Buttons Of Moving Between */}
			<ButtonGroup>
				<Button onClick={onPrevious} disabled={step === 0}>
					Anterior
				</Button>
				<Button onClick={onNext} disabled={step === 3}>
					Siguiente
				</Button>
			</ButtonGroup>
		</Container>

	);
};

export default RegisterSteps