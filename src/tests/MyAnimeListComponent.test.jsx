import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import MyAnimeListComponent from '../components/MyAnimeListComponent'

const SEARCHES_WAIT = 30e3

describe('MyAnimeListComponent', () => {
  test('should see an empty form', () => {
    const { container } = render(<MyAnimeListComponent />)

    expect(container.innerHTML).toMatch('MyAnimeList')
    expect(container.innerHTML).toMatch('Jikan')
    expect(container.querySelector('a[href^="https://myanimelist.net"]').textContent).toMatch('MyAnimeList')
    expect(container.querySelector('a[href^="https://jikan.moe"]').textContent).toMatch('Jikan API')
    expect(container.innerHTML).toMatch('Search for anime')
    expect(container.innerHTML).toMatch('Search for manga')
  })

  test('should run invalid search', async () => {
    const { container, getByText } = render(<MyAnimeListComponent />)
    const submit_button = getByText('Search for anime')

    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Error!'))
  }, SEARCHES_WAIT)

  test('should search for "piece" on anime and paginate', async () => {
    const { container, getByText } = render(<MyAnimeListComponent />)
    const search_box = container.querySelector('input[type=text]#mal_search')
    const submit_button = getByText('Search for anime')

    await fireEvent.change(search_box, {target: {value: 'piece'}})
    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    expect(container.innerHTML).toMatch('New search')
    expect(container.innerHTML).toMatch('Results: around')

    expect(container.querySelectorAll('.mal-result').length).toBeGreaterThanOrEqual(1)

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

  test('should search for "piece" on manga and then "New search"', async () => {
    const { container, getByText } = render(<MyAnimeListComponent />)
    const search_box = container.querySelector('input[type=text]#mal_search')
    const submit_button = getByText('Search for manga')

    await fireEvent.change(search_box, {target: {value: 'piece'}})
    await fireEvent.click(submit_button)

    await wait(() => expect(container.innerHTML).toMatch('Success!'))

    expect(container.innerHTML).toMatch('New search')
    expect(container.innerHTML).toMatch('Results: around')

    expect(container.querySelectorAll('.mal-result').length).toBeGreaterThanOrEqual(1)

    const new_search_button = getByText('New search')
    await fireEvent.click(new_search_button)

    expect(container.innerHTML).toMatch('Search for anime')
    expect(container.innerHTML).toMatch('Search for manga')
  }, SEARCHES_WAIT)
})
