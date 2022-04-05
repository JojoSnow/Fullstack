// interface BmiValues {
// 	height: number;
// 	weight: number;
// }

// const parseArgs = (args: Array<string>): BmiValues => {
// 	if (args.length < 4) throw new Error('Not enough arguments');
// 	if (args.length > 4) throw new Error('Too many arguments');

// 	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
// 		return {
// 			height: Number(args[2]),
// 			weight: Number(args[3])
// 		} 
// 	}	else {
// 			throw new Error('Provided height and weight were not numbers!');
// 		}
// }

export const calculateBmi = (h: number, w: number): string => {
	const bmi = w / Math.pow(h / 100, 2);

	switch (true) {
		case (18.5 > bmi):
			return 'Underweight';
		case (bmi > 18.5 && bmi < 25):
			return 'Normalweight';
		case (bmi > 25 && bmi < 30):
			return 'Overweight';
		case (bmi > 30):
			return 'Obese';
		default:
			throw new Error('Calculation error');
	}
}

// try {
// 	const {height, weight} = parseArgs(process.argv);
// 	console.log(calculateBmi(height, weight))
// } catch (error: unknown) {
// 	let errorMsg = 'Something bad happened.';
// 	if (error instanceof Error) {
// 		errorMsg += ' Error: ' + error.message;
// 	}
// 	console.log(errorMsg)
// }