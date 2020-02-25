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
          <Link to="/react-app/imdb">IMDB</Link>
        </li>
      </ul>
    </div>
  </div>
)

export default HomeComponent
