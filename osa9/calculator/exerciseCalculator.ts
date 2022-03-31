interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDesc: string;
	target: number;
	average: number;
}

const calculateExercise = (week: Array<number>, target: number): Result => {
	let trainingDays = 0;
	let rating = 0;
	let ratingDesc = '';
	let success = false;

	const mon = week[0];
	const tue = week[1];
	const wed = week[2];
	const thu = week[3];
	const fri = week[4];
	const sat = week[5];
	const sun = week[6];

	const periodLength = week.length;
	const average = (mon + tue + wed + thu + fri + sat + sun) / periodLength;

	week.forEach(day => {
		if(day !== 0) {
			trainingDays += 1;
		}
	})

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
			ratingDesc = 'bad should be better';
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

	if (rating === target) {
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
	}
};

const result = calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2)
console.log(result)