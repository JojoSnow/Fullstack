interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDesc: string;
	target: number;
	average: number;
}


// const parseArguments = (args: Array<string>) => {
// 	if (args.length < 4) throw new Error('Not enough arguments');

// 	const hours = [];

// 	for (let i = 2; i < args.length - 1; ++i) {
// 		if (!isNaN(Number(args[i]))) {
// 			hours.push(Number(args[i]));
// 		} else {
// 			throw new Error('Provided values were not numbers.');
// 		}	
// 	}

// 	const target = Number(args[args.length - 1]);
// 	if (target > 3 || target === 0) throw new Error('Place target at the end');

// 	return {
// 		days: hours,
// 		target: Number(target)
// 	};
// };

export const calculateExercise = (days: Array<number>, target: number): Result => {
	let trainingDays = 0;
	let rating = 0;
	let ratingDesc = '';
	let success = false;
	let average = 0;

	const periodLength = days.length;
	
	days.forEach(day => {
		average += day;
	});

	average = average / periodLength;

	days.forEach(day => {
		if(day !== 0) {
			trainingDays += 1;
		}
	});
	switch(true) {
		case (periodLength <= 3):
			rating = 1;
			break;
		case (periodLength > 3 && periodLength <= 9):
			rating = 2;
			break;
		case (periodLength > 9):
			rating = 3;
			break;
		default:
			throw new Error('Something went wrong.');
	}

	switch (rating) {
		case 1:
			ratingDesc = 'bad could be better';
			break;
		case 2:
			ratingDesc = 'not too bad could be better';
			break;
		case 3:
			ratingDesc = 'good could always be better';
			break;
		default:
			throw new Error('Something went wrong.');
	}

	if (average > target) {
		success = true;
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDesc,
		target,
		average
	};
};

// try {
// 	const {days, target} = parseArguments(process.argv);
// 	console.log(calculateExercise(days, target));
// 	console.log('If your target is wrong, you didn\'t place it in the end of your array.');
// } catch (error: unknown) {
// 	let errorMsg = 'Something bad happened.';
// 	if (error instanceof Error) {
// 		errorMsg += ' Error: ' + error.message;
// 	}
// 	console.log(errorMsg);
// }