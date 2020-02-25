import React from 'react'
import useIMDBHook from '../hooks/IMDBHook'
import IMDBAPIResponseComponent from './IMDBAPIResponseComponent'
import IMDBFormComponent from './IMDBFormComponent'
import '../assets/css/IMDB.css'

const IMDBComponent = () => {
  const hook = useIMDBHook()

  return (
    <div>
      <IMDBFormComponent hook={hook} />

      <IMDBAPIResponseComponent hook={hook} />
    </div>
  )
}

export default IMDBComponent
