import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercise} from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/bmi', (req, res) => {
	try {
		const height = Number(req.query.height);
		const weight = Number(req.query.weight);
		const bmi = calculateBmi(height, weight);
		
		const result = {
			weight: weight,
			height: height,
			bmi: bmi
		};
	
		res.send(result);
	} catch (error: unknown) {
		res.send({
			error: 'Malformatted parameters'
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {hours, target} = req.body

	if (hours) {
		for (let hour of hours) {
			if (isNaN(Number(hour))) {
				return res.send({error: 'Malformatted parameters'}).status(400);
			}
		}
	} else {
		return res.send({Error: 'Parameters missing'}).status(400);
	}

	if (!target) {
		return res.send({Error: 'Parameters missing'}).status(400);
	} else if (isNaN(Number(target))) {
		return res.send({error: 'Malformatted parameters'}).status(400);
	}

	if (hours !== Array) {
		return res.send({error: 'Malformatted parameters'}).status(400);
	}

	const result = calculateExercise(hours, Number(target));
	return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});