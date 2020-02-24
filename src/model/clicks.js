import React from 'react'

const initModel = () =>
  [
    // <name of the field>, <initial value>
    ['count'              , 0],
    ['thinking'           , false],
    ['visible'            , true]

  ].reduce((model, [name, init_value]) => {
    const [value, update] = React.useState(init_value)
    model[name] = {value, update, init_value}
    return model
  }, {})

const createActions = model => {
  const actions = {
    ADD_CLICKED_ASYNC: async event => {
      model.thinking.update(old_think => true)
      await new Promise(r => setTimeout(r, 400 + Math.random() * 1e3))
      if(model.visible.value) {
        actions.ADD_CLICKED()
        model.thinking.update(old_think => false)
      }
    },

    ADD_CLICKED: () => {
      model.count.update(old_count => old_count + 1)
    },

    RESTART: () => {
      for(const prop in model)
        model[prop].update(model[prop].init_value)
    },

    UNMOUNT: () => {
      model.count.update(0)
      model.visible.update(false)
      document.title = 'Unmounted'
    }
  }

  return actions
}

export {
  initModel,
  createActions
}
