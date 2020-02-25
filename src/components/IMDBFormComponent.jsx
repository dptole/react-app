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

      <div className="form-group">
        <label>API Key:</label>
        <input disabled={searching} value={apikey} onChange={updateAPIKey} className="form-control" autoFocus={true} type="text" />
      </div>

      <div className="form-group">
        <label>Search:</label>
        <input disabled={searching} value={search} onChange={updateSearch} className="form-control" type="text" />
      </div>

      <div className="form-group">
        <button disabled={searching} className="btn btn-primary">Submit</button>
      </div>

      {searching ? <h1>Searching...</h1> : null}
    </form>
  )
}

export default IMDBFormComponent
