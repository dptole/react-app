import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import AppComponent from '../components/AppComponent'

describe('AppComponent', () => {
  test('should check for existance of "Click me (async)" and "Click me" buttons', () => {
    const { container } = render(<AppComponent />)

    expect(container.innerHTML).toMatch('You have never clicked')
    expect(container.innerHTML).toMatch('Click me (async)')
    expect(container.innerHTML).toMatch('Click me')
  })
})
