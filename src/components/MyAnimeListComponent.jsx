import React from 'react'
import useMyAnimeListHook from '../hooks/MyAnimeListHook'
import MyAnimeListFormComponent from './MyAnimeListFormComponent'
import MyAnimeListResponseComponent from './MyAnimeListResponseComponent'

const MyAnimeListComponent = () => {
  const hook = useMyAnimeListHook()

  return (
    <div>
      <MyAnimeListFormComponent hook={hook} />

      <MyAnimeListResponseComponent hook={hook} />
    </div>
  )
}

export default MyAnimeListComponent
