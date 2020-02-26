import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ProgrammingQuotesComponent from '../components/ProgrammingQuotesComponent'

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

describe('ProgrammingQuotesComponent', () => {
  test('should see an empty form', () => {
    const { container } = render(<ProgrammingQuotesComponent />)

    expect(container.innerHTML).toMatch('Programming Quotes API')
    expect(container.querySelector('a[href^="https://github.com/skolakoda/programming-quotes-api"]').textContent).toMatch('Programming Quotes API')
    expect(container.innerHTML).toMatch('Search for a quote')
  })

  test('search for the first quote and another one', async () => {
    const { container, getByText } = render(<ProgrammingQuotesComponent />)
    const submit_button = getByText('Search for a quote')

    await fireEvent.click(submit_button)

    expect(container.innerHTML).toMatch('Searching...')

    await wait(() => expect(container.innerHTML).toMatch('Another one'))

    const first_quote_content = container.querySelector('h2').textContent

    expect(container.querySelectorAll('h2').length).toBe(1) // quote
    expect(container.querySelectorAll('h6').length).toBe(1) // author
    expect(container.querySelector('h6').textContent.charCodeAt(0)).toBe(8211) // dash before author

    const another_submit_button = getByText('Another one')
    await fireEvent.click(another_submit_button)

    expect(container.innerHTML).toMatch('Another one')

    const second_quote_content = container.querySelector('h2').textContent

    expect(container.querySelectorAll('h2').length).toBe(1) // quote
    expect(container.querySelectorAll('h6').length).toBe(1) // author
    expect(container.querySelector('h6').textContent.charCodeAt(0)).toBe(8211) // dash before author

    expect(first_quote_content).not.toBe(second_quote_content)
  })

  test('search mock fetch to return a response that is an unknown error', async () => {
    const { container, getByText } = render(<ProgrammingQuotesComponent />)
    const submit_button = getByText('Search for a quote')

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.reject()
    )

    await fireEvent.click(submit_button)

    expect(container.innerHTML).toMatch('Unknown error')
  })

  test('search mock fetch to return a response that is an custom error', async () => {
    const { container, getByText } = render(<ProgrammingQuotesComponent />)
    const submit_button = getByText('Search for a quote')

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.reject({message: 'Custom error message'})
    )

    await fireEvent.click(submit_button)

    expect(container.innerHTML).toMatch('Custom error message')
  })
})

afterAll(() => {
  console.error = originalError
})
