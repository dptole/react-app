import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import IMDBComponent from '../components/IMDBComponent'

const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY
const SEARCHES_WAIT = 30e3

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
// I'm using React 16.12 and its not yet upgraded
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

describe('IMDBComponent', () => {
  test('should see an empty form', () => {
    const { container } = render(<IMDBComponent />)

    expect(container.innerHTML).toMatch('IMDB Search')
    expect(container.innerHTML).toMatch('API Key')
    expect(container.innerHTML).toMatch('http://www.omdbapi.com/apikey.aspx')
    expect(container.innerHTML).toMatch('Search')
    expect(container.innerHTML).toMatch('Submit')
  })

  test('should run invalid search', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const submit_button = getByText('Submit')

    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Error!'))
  }, SEARCHES_WAIT)

  IMDB_API_KEY &&
  test('should search for "joker" and "bird" and then "New search"', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const apikey_box = container.querySelector('input[type=text]#imdb_apikey')
    const search_box = container.querySelector('input[type=text]#imdb_search')
    const submit_button = getByText('Submit')

    await fireEvent.change(apikey_box, {target: {value: IMDB_API_KEY}})
    await fireEvent.change(search_box, {target: {value: 'joker'}})
    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    expect(container.innerHTML).toMatch('New search')
    expect(container.innerHTML).toMatch('Results: ')

    expect(container.querySelectorAll('.imdb-result').length).toBeGreaterThanOrEqual(1)

    await fireEvent.change(search_box, {target: {value: 'bird'}})
    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    expect(container.innerHTML).toMatch('New search')
    expect(container.innerHTML).toMatch('Results: ')

    expect(container.querySelectorAll('.imdb-result').length).toBeGreaterThanOrEqual(1)

    const new_search_button = getByText('New search')
    await fireEvent.click(new_search_button)

    expect(container.innerHTML).toMatch('IMDB Search')
    expect(container.innerHTML).toMatch('API Key')
    expect(container.innerHTML).toMatch('http://www.omdbapi.com/apikey.aspx')
    expect(container.innerHTML).toMatch('Search')
    expect(container.innerHTML).toMatch('Submit')
  }, SEARCHES_WAIT)

  IMDB_API_KEY &&
  test('should search for "batman" and paginate', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const apikey_box = container.querySelector('input[type=text]#imdb_apikey')
    const search_box = container.querySelector('input[type=text]#imdb_search')
    const submit_button = getByText('Submit')

    await fireEvent.change(apikey_box, {target: {value: IMDB_API_KEY}})
    await fireEvent.change(search_box, {target: {value: 'batman'}})
    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    expect(container.innerHTML).toMatch('New search')
    expect(container.innerHTML).toMatch('Results: ')

    expect(parseInt(container.querySelector('span#imdb_total_result').textContent)).toBeGreaterThanOrEqual(20)

    const page_two_link = container.querySelector('ul.pagination > li:nth-child(3) > a')

    await fireEvent.click(page_two_link)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    const last_page_link = container.querySelector('ul.pagination > li:first-child > a')

    await fireEvent.click(last_page_link)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    const first_page_link = container.querySelector('ul.pagination > li:last-child > a')

    await fireEvent.click(first_page_link)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))
  }, SEARCHES_WAIT)

  test('should mock fetch to return a well formatted error response from the service', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const submit_button = getByText('Submit')

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      ({
        json: () =>
          Promise.resolve({
            Response: 'False',
            Error: 'Mocked error from the service'
          })
      })
    )

    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Error!'))
    expect(container.innerHTML).toMatch('Mocked error from the service')
  })

  test('should mock fetch to return a response that represents a client error', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const submit_button = getByText('Submit')

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      ({
        json: () =>
          Promise.reject({message: 'Client error'})
      })
    )

    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Unknown response'))
  })

  test('should mock fetch to return a response that is neither success nor error', async () => {
    const { container, getByText } = render(<IMDBComponent />)
    const submit_button = getByText('Submit')

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      ({
        json: () =>
          Promise.resolve({unexpected_field: 'Unexpected value'})
      })
    )

    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Unknown response'))
  })
})

afterAll(() => {
  console.error = originalError
})

