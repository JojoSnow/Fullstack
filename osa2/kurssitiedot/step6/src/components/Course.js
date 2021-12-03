import React from 'react';

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
};
  
const Part = ({parts}) => {
    return (
        <>
            {parts.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </>
    );
};
  
const Content = (props) => {
    const { course } = props;

    return (
        <ul>
            <Part parts={course.parts} />
        </ul>
    );
};

const Note = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
        </div>
    )
}

export default Note;