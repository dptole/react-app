import React from 'react'
import PropTypes from 'prop-types'
import { isSuccessResponse } from './MyAnimeListResponseComponent'

const MyAnimeListFormComponent = props => {
  const [
    {search, search_type, searching, output},
    {doSearchManga, doSearchAnime, updateSearch}
  ] = props.hook

  return (
    <form hidden={isSuccessResponse(output)}>
      <h1 className="title">MyAnimeList Search (Jikan API)</h1>

      <h5>Welcome to <a rel="noreferrer noopener" target="_blank" href="https://myanimelist.net">MyAnimeList</a>, the world&#39;s most active online anime and manga community and database. Join the online community, create your anime and manga list, read reviews, explore the forums, follow news, and so much more!</h5>

      <h5><a rel="noreferrer noopener" target="_blank" href="https://jikan.moe">Jikan API</a> (時間) is an open-source PHP &amp; REST API for the &#34;most active online anime + manga community and database&#34; - MyAnimeList. It parses the website to satisfy the need for an API.</h5>

      <div className="form-group">
        <label>Search:</label>
        <input disabled={searching} value={search} autoFocus={true} onChange={updateSearch} className="form-control" id="mal_search" type="text" />
      </div>

      <div className="form-group">
        <button onClick={doSearchAnime} disabled={searching} className="btn btn-primary">Search for anime</button>
        <button onClick={doSearchManga} disabled={searching} className="btn">Search for manga</button>
      </div>

      {searching ? <h1>Searching for {search_type}...</h1> : null}
    </form>
  )
}

MyAnimeListFormComponent.propTypes = {
  hook: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        search_type: PropTypes.oneOf(['manga', 'anime']),
        search: PropTypes.string,
        output: PropTypes.object,
        searching: PropTypes.bool
      }),
      PropTypes.shape({
        doSearchManga: PropTypes.func,
        doSearchAnime: PropTypes.func,
        updateSearch: PropTypes.func
      })
    ])
  )
}

export default MyAnimeListFormComponent
