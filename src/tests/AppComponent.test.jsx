import React from 'react'
import { render } from '@testing-library/react'
import AppComponent from '../components/AppComponent'

describe('AppComponent', () => {
  test('should check for existance of "Click me (async)" and "Click me" buttons', () => {
    const { container } = render(<AppComponent />)

    expect(container.innerHTML).toMatch('Small apps')
    expect(container.innerHTML).toMatch('Clicks')

    expect(container.innerHTML).toMatch('Public APIs')
    expect(container.innerHTML).toMatch('IMDB')
  })
})
