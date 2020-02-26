import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import IMDBComponent from '../components/IMDBComponent'

const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY
const SEARCHES_WAIT = 30e3

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

  test('should search for "jorker" and "bird"', async () => {
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
  }, SEARCHES_WAIT)

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
})
