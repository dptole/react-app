import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import AppComponent from '../components/AppComponent'

describe('AppComponent', () => {
  test('should check for existence of "Click me (async)" and "Click me" buttons', () => {
    const { container } = render(<AppComponent />)

    expect(container.innerHTML).toMatch('Small apps')
    expect(container.innerHTML).toMatch('Clicks')

    expect(container.innerHTML).toMatch('Public APIs')
    expect(container.innerHTML).toMatch('Open Movie Database')
    expect(container.innerHTML).toMatch('MyAnimeList')
    expect(container.innerHTML).toMatch('Programming Quotes')
  })

  test('should lazy load ClicksComponent', async () => {
    const { container, getByText } = render(<AppComponent />)
    const link_clicks = getByText('Clicks')

    await fireEvent.click(link_clicks)

    await wait(() => expect(container.innerHTML).toMatch('You have never clicked'))
  })

  test('should lazy load IMDBComponent', async () => {
    const { container, getByText } = render(<AppComponent />)
    const link_clicks = getByText('Open Movie Database')

    await fireEvent.click(link_clicks)

    await wait(() => expect(container.innerHTML).toMatch('IMDB Search'))
  })

  test('should lazy load MyAnimeListComponent', async () => {
    const { container, getByText } = render(<AppComponent />)
    const link_clicks = getByText('MyAnimeList')

    await fireEvent.click(link_clicks)

    await wait(() => expect(container.innerHTML).toMatch('MyAnimeList Search (Jikan API)'))
  })

  test('should lazy load ProgrammingQuotesComponent', async () => {
    const { container, getByText } = render(<AppComponent />)
    const link_clicks = getByText('Programming Quotes')

    await fireEvent.click(link_clicks)

    await wait(() => expect(container.innerHTML).toMatch('ProgrammingQuotes'))
  })
})
