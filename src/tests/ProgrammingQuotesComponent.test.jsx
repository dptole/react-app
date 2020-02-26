import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ProgrammingQuotesComponent from '../components/ProgrammingQuotesComponent'

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
})
