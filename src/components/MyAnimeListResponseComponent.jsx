import React from 'react'
import PropTypes from 'prop-types'

const RESULTS_PER_PAGE = 50

const MyAnimeListResponseComponent = props => {
  const [
    {page, output, searching, search_type},
    { doPaginatedSearch: onPaginatedSearch, newSearch: onNewSearch }
  ] = props.hook

  if(output) {
    if(isSuccessResponse(output))
      return successResponse(output, search_type, page, searching, onPaginatedSearch, onNewSearch)

    else if(isErrorResponse(output))
      return errorResponse({message: 'No results', ...output})

    else if(Object.keys(output).length > 0)
      return (
        <div>Unknown response</div>
      )
  }

  return null
}

MyAnimeListResponseComponent.propTypes = {
  hook: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        search_type: PropTypes.oneOf(['manga', 'anime']),
        search: PropTypes.string,
        output: PropTypes.object,
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
  response && Array.isArray(response.results) && response.results.length === 0

const isSuccessResponse = response =>
  response && Array.isArray(response.results) && response.results.length > 0

const errorResponse = error => (
  <div className="form-group">
    <h1>Error!</h1>

    {error.message}
  </div>
)

const successResponse = (response, search_type, page, searching, onPaginatedSearch, onNewSearch) => {
  if(searching)
    return (
      <div>
        <h1>Searching...</h1>
      </div>
    )

  let pagination = null
  let around_result = 0
  const result_no = (page - 1) * RESULTS_PER_PAGE

  if(response.last_page > 1) {
    around_result = RESULTS_PER_PAGE * response.last_page
    const pages = Array.from(Array(response.last_page - 1))

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

        <span>Results: around <span id="mal_around_result">{around_result}</span></span>

        {pagination}

        <div>
          {response.results.map((result, index) =>
            <div className={'mal-result mal-result-' + index} key={result.mal_id}>
              <hr />

              <div>
                <label>
                  {result_no + index + 1}&ndash;
                  <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                </label>
              </div>

              <div>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  <img src={result.image_url} alt="Poster" />
                </a>
              </div>

              <div><label>Score:</label> {result.score}</div>
              {search_type === 'anime'
                ? <div><label>Episodes:</label> {result.episodes}</div>
                : <div><label>Chapters:</label> {result.chapters}</div>
              }
              <div><label>Type:</label> {result.type}</div>
              <div><label>Synopsis:</label> {result.synopsis}</div>
            </div>
          )}
        </div>

        {pagination}

      </div>
    </div>
  )
}

export default MyAnimeListResponseComponent
export { isSuccessResponse }
