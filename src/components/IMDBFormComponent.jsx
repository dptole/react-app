import React from 'react'
import { isSuccessResponse } from './IMDBAPIResponseComponent'

const IMDBFormComponent = props => {
  const [
    {apikey, search, searching, output},
    {updateAPIKey, updateSearch, doSearch}
  ] = props.hook

  return (
    <form hidden={isSuccessResponse(output)} onSubmit={doSearch}>
      <h1 className="title">IMDB Search</h1>

      <h5>IMDb is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows. Get personalized recommendations, and learn where to watch across hundreds of streaming providers.</h5>

      <div className="form-group">
        <label>API Key:</label>
        <input disabled={searching} value={apikey} onChange={updateAPIKey} className="form-control" id="imdb_apikey" autoFocus={true} type="text" />

        <blockquote>
          <small>You must go to <a target="_blank" rel="noopener noreferrer" href="http://www.omdbapi.com/apikey.aspx">http://www.omdbapi.com/apikey.aspx</a> to generate your API key.</small>
        </blockquote>

      </div>

      <div className="form-group">
        <label>Search:</label>
        <input disabled={searching} value={search} onChange={updateSearch} className="form-control" id="imdb_search" type="text" />
      </div>

      <div className="form-group">
        <button disabled={searching} className="btn btn-primary">Submit</button>
      </div>

      {searching ? <h1>Searching...</h1> : null}
    </form>
  )
}

export default IMDBFormComponent
