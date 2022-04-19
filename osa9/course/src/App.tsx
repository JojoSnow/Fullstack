
interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CoursePartExtendedBase extends CoursePartBase {
	description: string;
	type: string;
}

interface CourseNormalPart extends CoursePartExtendedBase {
	type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
	type: 'groupProject';
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartExtendedBase {
	type: 'submission';
	exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartExtendedBase {
	type: 'special';
	requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({name}: {name: string}): JSX.Element => (
	<h1>{name}</h1>
);

const Total = ({parts}: {parts: CoursePart[]}): JSX.Element => (
	<p>
		Number of exercises{' '}
		{parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
	</p>
);

const Content = ({parts}: {parts: CoursePart[]}): JSX.Element => (
	<>
		{parts.map(part => (
			<Part key={part.name} part={part} />
		))}
	</>
);	

const Part = ({part}: {part: CoursePart}): JSX.Element => {
	switch (part.type) {
		case 'normal':
			return (
				<div>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p>{part.description}</p>
				</div>
			);
		case 'groupProject':
			return (
				<div>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p>Project exercises {part.groupProjectCount}</p>
				</div>
			);
		case 'submission':
			return (
				<div>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p>{part.description}</p>
					<p>Submit to {part.exerciseSubmissionLink}</p>
				</div>
			);
		case 'special':
			return (
				<div>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p>{part.description}</p>
					<p>Required skills: {part.requirements}</p>
				</div>
			);
		default:
			return assertNever(part);
	}
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is the leisured course part',
			type: 'normal'
		},
		{
			name: 'Advanced',
			exerciseCount: 7,
			description: 'This is the harded course part',
			type: 'normal'
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			type: 'groupProject'
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
			type: 'submission'
		},
		{
			name: 'Backend development',
			exerciseCount: 21,
			description: 'Typing the backend',
			requirements: ['nodejs', 'jest'],
			type: 'special'
		}
	]

	return (
		<div>
			<Header name={courseName} />
			<Content parts={courseParts} />
			<Total parts={courseParts} />
		</div>
	);
};

export default App;