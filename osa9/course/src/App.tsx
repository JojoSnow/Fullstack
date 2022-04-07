
const Header = ({name}: {name: string}): JSX.Element => (
	<h1>{name}</h1>
);

interface Parts {
	name: string;
	excerciseCount: number;
}

const Content = ({parts}: {parts: Array<Parts>}): JSX.Element => (
	<>
	{parts.map(part => {
		<p key={part.name}>
			{part.name} {part.excerciseCount}
		</p>
	})}
	</>
);

const Total = ({parts}: {parts: Array<Parts>}): JSX.Element => (
	<p>
		Number of exercises{" "}
		{parts.reduce((carry, part) => carry + part.excerciseCount, 0)}
	</p>
);

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts = [
		{
			name: 'Fundamentals',
			excerciseCount: 10
		},
		{
			name: 'Using props to pass data',
			excerciseCount: 7
		},
		{
			name: 'Deeper type usage',
			excerciseCount: 14
		}
	];

	return (
		<div>
			<Header name={courseName} />
			<Content parts={courseParts} />
			<Total parts={courseParts} />
		</div>
	);
};

export default App;