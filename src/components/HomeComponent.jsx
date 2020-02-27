import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../assets/utils/const'

const HomeComponent = () => (
  <div>
    <div>
      <h1>Small apps</h1>
      <ul>
        <li>
          <Link to={ROUTES.CLICKS}>Clicks</Link>
        </li>
      </ul>
    </div>

    <div>
      <h1>Public APIs</h1>
      <ul>
        <li>
          <Link to={ROUTES.IMDB}>Open Movie Database</Link>
        </li>
        <li>
          <Link to={ROUTES.MAL}>MyAnimeList</Link>
        </li>
        <li>
          <Link to={ROUTES.PROGQ}>Programming Quotes</Link>
        </li>
      </ul>
    </div>
  </div>
)

export default HomeComponent
