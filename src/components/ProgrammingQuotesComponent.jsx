import React from 'react'
import useProgrammingQuotesHook from '../hooks/ProgrammingQuotesHook'

const ProgrammingQuotesComponent = () => {
  const [
    {searching, quote, error},
    {doSearch}
  ] = useProgrammingQuotesHook()

  return (
    <form>
      <h1 className="title">ProgrammingQuotes</h1>

      <h5><a rel="noreferrer noopener" target="_blank" href="https://github.com/skolakoda/programming-quotes-api">Programming Quotes API</a> for open source projects.</h5>

      <div className="form-group">
        <button onClick={doSearch} disabled={searching} className="btn btn-primary">{quote ? 'Another one' : 'Search for a quote'}</button>
      </div>

      {searching ? <h1>Searching...</h1> : null}

      {error !== false
        ? <div className="form-group">
            <h1>Error!</h1>
            {error}
          </div>
        : null
      }

      {quote !== false
        ? <div className="form-group">
            <hr />
            <h2>{quote.content}</h2>
            <h6>&ndash;<a rel="noreferrer noopener" target="_blank" href={quote.author_url}>{quote.author}</a></h6>
          </div>
        : null
      }
    </form>
  )
}

export default ProgrammingQuotesComponent
