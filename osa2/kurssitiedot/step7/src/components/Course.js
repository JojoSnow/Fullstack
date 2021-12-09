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

const Total = (props) => {
    return (
      <>
        <p>Number of exercises {props.total}</p>
      </>
    )
  }
  
const Content = (props) => {
    const { course } = props;

    return (
        <ul>
            <Part parts={course.parts} />
        </ul>
    );
};

const Note = ({ course, total }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total total={total} />
        </div>
    )
}

export default Note;