import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import IMDBComponent from '../components/IMDBComponent'

describe('IMDBComponent', () => {
  test('should see an empty form', () => {
    const { container, getByText } = render(<IMDBComponent />)

    expect(container.innerHTML).toMatch('IMDB Search')
    expect(container.innerHTML).toMatch('API Key')
    expect(container.innerHTML).toMatch('Search')
    expect(container.innerHTML).toMatch('Submit')
  })
})
