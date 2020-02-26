import React from 'react'
import { Link } from 'react-router-dom'

const HomeComponent = () => (
  <div>
    <div>
      <h1>Small apps</h1>
      <ul>
        <li>
          <Link to="/react-app/clicks">Clicks</Link>
        </li>
      </ul>
    </div>

    <div>
      <h1>Public APIs</h1>
      <ul>
        <li>
          <Link to="/react-app/imdb">Open Movie Database</Link>
        </li>
        <li>
          <Link to="/react-app/mal">MyAnimeList</Link>
        </li>
      </ul>
    </div>
  </div>
)

export default HomeComponent
