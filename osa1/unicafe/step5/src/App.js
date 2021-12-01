import React, { useState } from 'react';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const StatsLine = (props) => <p>{props.text} {props.value} {props.extra}</p>;

const Stats = (props) => {
  if (props.all === 0) {
    return (
      <>
        <StatsLine text='No feedback given' />
      </>
    )
  } else return (
    <>
      <StatsLine text='good' value={props.good} />
      <StatsLine text='neutral' value={props.neutral} />
      <StatsLine text='bad' value={props.bad} />
      <StatsLine text='all' value={props.all} />
      <StatsLine text='average' value={props.average / props.all} />
      <StatsLine text='positive' value={props.positive} extra='%' />
    </>
  )
}

const Title = ({title}) => <h1>{title}</h1>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1);
    if (good !== 0 || all !== 0) {
      setPositive(((good + 1)/(all + 1)) * 100);
    } else {
      setPositive(100);
    }
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    if (good !== 0 && all !== 0) {
      setPositive((good / (all + 1)) * 100);
    } else {
      setPositive(0);
    }
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage(average - 1);
    if (good !== 0 && all !== 0) {
      setPositive((good / (all + 1)) * 100);
    } else {
      setPositive(0);
    }
  };
  
  return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Title title='statistics' />
      <Stats good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  );
}

export default App;
