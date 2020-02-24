import React from 'react'
import { initModel, createActions } from '../model/clicks'

const Clicks = () => {
  const model = initModel()
  const actions = createActions(model)

  const amount = model.count.value === 1 ? 'time' : 'times'
  const title = model.count.value === 0
    ? 'You have never clicked'
    : `You clicked ${model.count.value} ${amount}`

  React.useEffect(() => {
    if(model.visible.value)
      document.title = 'Clicks: ' + model.count.value

    return () => {
      if(model.count.value >= 10)
        actions.UNMOUNT()
    }
  })

  if(model.visible.value === false)
    return (
      <div className="text-center">
        <h1 className="title">Too many clicks!</h1>
        <div><button className="btn btn-primary" onClick={actions.RESTART}>Restart</button></div>
      </div>
    );

  return (
    <div className="text-center">
      <h1 className="title">{title}</h1>

      {model.thinking.value
        ? <button className="btn">Adding...</button>
        : <button className="btn btn-warning" onClick={actions.ADD_CLICKED_ASYNC}>Click me (async)</button>
      }

      <button className="btn btn-primary" onClick={actions.ADD_CLICKED}>Click me</button>
    </div>
  )
}

export default Clicks
