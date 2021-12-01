import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Stats = (props) => <p>{props.text} {props.handleStat} {props.extra}</p>

const Title = ({title}) => <h1>{title}</h1>

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

  if (all === 0) {
    return (
      <div>
        <Title title='give feedback' />
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
        <Title title='statistics' />
        <Stats text='No feedback given' />
      </div>
    )
  } else return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Title title='statistics' />
      <Stats text='good' handleStat={good} />
      <Stats text='neutral' handleStat={neutral} />
      <Stats text='bad' handleStat={bad} />
      <Stats text='all' handleStat={all} />
      <Stats text='average' handleStat={average / all} />
      <Stats text='positive' handleStat={positive} extra='%' />
    </div>
  )
}

export default App;
