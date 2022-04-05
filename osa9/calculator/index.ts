import express from 'express';
import {calculateBmi} from './bmiCalculator';
const app = express();

app.get('/bmi', (req, res) => {
	try {
		const height = Number(req.query.height)
		const weight = Number(req.query.weight)
		const bmi = calculateBmi(height, weight)
		
		const result = {
			weight: weight,
			height: height,
			bmi: bmi
		}
	
		res.send(result);
	} catch (error: unknown) {
		res.send({
			error: 'Malformatted parameters'
		})
	}
	

	
	
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})