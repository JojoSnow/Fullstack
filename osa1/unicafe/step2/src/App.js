import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Stats = ({handleStat, text}) => <p>{text} {handleStat}</p>


const Title = ({title}) => <h1>{title}</h1>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Title title='statistics' />
      <Stats text='good' handleStat={good} />
      <Stats text='neutral' handleStat={neutral} />
      <Stats text='bad' handleStat={bad} />
    </div>
  )
}

export default App