import React from 'react'
import useClicksHook from '../hooks/ClicksHook'

const ClicksComponent = () => {
  const [
    {count, thinking, visible},
    {increaseAsync, increase, restart}
  ] = useClicksHook()

  const title = count === 0
    ? 'You have never clicked'
    : count === 1
    ? 'You clicked once'
    : `You clicked ${count} times`

  if(visible === false)
    return (
      <div className="text-center">
        <h1 className="title">Too many clicks!</h1>
        <div><button className="btn btn-primary" onClick={restart}>Restart</button></div>
      </div>
    );

  return (
    <div className="text-center">
      <h1 className="title">{title}</h1>

      {thinking
        ? <button className="btn">Adding...</button>
        : <button className="btn btn-warning" onClick={increaseAsync}>Click me (async)</button>
      }

      <button className="btn btn-primary" onClick={increase}>Click me</button>
    </div>
  )
}

export default ClicksComponent
