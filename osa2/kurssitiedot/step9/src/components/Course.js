import React from 'react';

const Header = (props) => {
    return (
        <>
            <h2>{props.course.name}</h2>
        </>
    );
};
  
const Part = (props) => {
    const { course } = props;
    const parts = course.parts;

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
    const { course } = props;
    const parts = course.parts;
    const total = parts.map(part => part.exercises)
        .reduce((sum, exercise) => sum + exercise, 0)
        
    return (
      <>
        <p>total of exercises {total}</p>
      </>
    );
};
  
const Content = (props) => {
    
    return (
        <ul>
            <Part course={props.course} />
        </ul>
    );
};

const Note = ({ course }) => {

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
            
    );
};

export default Note;