import React from 'react'
import PropTypes from 'prop-types'

const RESULTS_PER_PAGE = 10

const IMDBAPIResponseComponent = props => {
  const [
    {page, output, searching},
    { doPaginatedSearch: onPaginatedSearch, newSearch: onNewSearch }
  ] = props.hook

  if(output) {
    if(isSuccessResponse(output))
      return successResponse(output, page, searching, onPaginatedSearch, onNewSearch)

    else if(isErrorResponse(output))
      return errorResponse(output)

    else if(Object.keys(output).length > 0)
      return (
        <div>Unknown response</div>
      )
  }

  return null
}

IMDBAPIResponseComponent.propTypes = {
  hook: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        page: PropTypes.number,
        output: PropTypes.string,
        searching: PropTypes.bool
      }),
      PropTypes.shape({
        doPaginatedSearch: PropTypes.func,
        newSearch: PropTypes.func
      })
    ])
  )
}

const isErrorResponse = response =>
  response && response.Response === 'False'

const isSuccessResponse = response =>
  response && response.Response === 'True'

const errorResponse = error => (
  <div className="form-group">
    <h1>Error!</h1>

    {error.Error}
  </div>
)

const successResponse = (response, page, searching, onPaginatedSearch, onNewSearch) => {
  if(searching)
    return (
      <div>
        <h1>Searching...</h1>
      </div>
    )

  let pagination = null
  const result_no = (page - 1) * RESULTS_PER_PAGE

  if(response.Search.length < response.totalResults) {
    const total = parseInt(response.totalResults)
    const pages = Array.from(Array(Math.ceil(total / RESULTS_PER_PAGE)))

    const shouldPaginate = new_page =>
      new_page > 0 && new_page <= pages.length && new_page !== page

    const onPreviousPage = event =>
      shouldPaginate(page - 1) && onPaginatedSearch(page - 1)(event)

    const onNextPage = event =>
      shouldPaginate(page + 1) && onPaginatedSearch(page + 1)(event)

    const onJumpPage = jump_page => event =>
      shouldPaginate(jump_page) && onPaginatedSearch(jump_page)(event)

    pagination = (
      <div>
        <ul className="pagination">
          <li>
            {/* eslint-disable-next-line */}
            <a onClick={onPreviousPage} href="#" aria-label="Previous" rel="noopener noreferrer">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pages.map((_, index) =>
            // eslint-disable-next-line
            <li key={index} className={index + 1 === page ? 'active' : ''}><a onClick={onJumpPage(index + 1)} href="#" rel="noopener noreferrer">{index + 1}</a></li>
          )}

          <li>
            {/* eslint-disable-next-line */}
            <a onClick={onNextPage} href="#" aria-label="Next" rel="noopener noreferrer">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={onNewSearch}>New search</button>
      </div>

      <div className="form-group">
        <h1>Success!</h1>

        <span>Results: <span id="imdb_total_result">{response.totalResults}</span></span>

        {pagination}

        <div>
          {response.Search.map((result, index) =>
            <div className={'imdb-result imdb-result-' + index} key={result.imdbID}>
              <hr />

              <div>
                <label>
                  {result_no + index + 1}&ndash;
                  <a href={'https://www.imdb.com/title/' + result.imdbID + '/'} target="_blank" rel="noopener noreferrer">{result.Title}</a>
                </label>
              </div>

              <div><label>Year:</label> {result.Year}</div>
              <div><label>Type:</label> {result.Type}</div>

              <div>
                {result.Poster === 'N/A'
                  ? null
                  : (
                      <a href={'https://www.imdb.com/title/' + result.imdbID + '/'} target="_blank" rel="noopener noreferrer">
                        <img src={result.Poster} alt="Poster" />
                      </a>
                    )
                }
              </div>
            </div>
          )}
        </div>

        {pagination}

      </div>
    </div>
  )
}

export default IMDBAPIResponseComponent
export { isSuccessResponse }
