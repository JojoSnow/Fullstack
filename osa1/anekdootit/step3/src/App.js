import React, { useState } from 'react';

const Title = ({title}) => <h1>{title}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.value}</button>

const Votes = (props) => {
  const max = Math.max(...props.points);
  const index = props.points.indexOf(max);
  
  return (
    <>
      <p>{props.anecdotes[index]}</p>
      <p>has {props.points[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];
  
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(7).fill(0));
  const copy = [...points];

  const handleSelected = () => {
    const randomNum = Math.floor(Math.random() * 7);

    setSelected(randomNum);
  }

  const handleVotes = () => {
    copy[selected] += 1;

    setPoints(copy);
  }
  
  return (
    <div>
      <Title title='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVotes} value='vote' />
      <Button handleClick={handleSelected} value='next anecdote' />
      <Title title='Anecdote with most votes' />
      <Votes points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;