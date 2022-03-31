
const calculateBmi = (h: number, w: number): string => {
	const bmi = w / Math.pow(h / 100, 2);

	switch (true) {
		case (18.5 > bmi):
			return 'Underweight';
		case (bmi > 18.5 && bmi < 25):
			return 'Normal (healthy weight)';
		case (bmi > 25 && bmi < 30):
			return 'Overweight';
		case (bmi > 30):
			return 'Obese'
		default:
			throw new Error('Something went wrong')
	}
		
}

console.log(calculateBmi(180, 74))