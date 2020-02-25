import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import AppComponent from '../components/AppComponent'

describe('ClicksComponent', () => {
  test('should click button "Click me" twice', () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me'))
    fireEvent.click(getByText('Click me'))

    expect(container.innerHTML).toMatch('You clicked 2 times')
  })

  test('should click button "Click me (async)" and see "Adding..."', () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me (async)'))

    expect(container.innerHTML).toMatch('Adding...')
  })

  test('should click button "Click me (async)" and wait', async () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me (async)'))

    expect(container.innerHTML).toMatch('Adding...')

    await wait(() => expect(container.innerHTML).toMatch('You clicked 1 time'))
  })

  test('should max out on "Click me"', () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 1 time')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 2 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 3 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 4 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 5 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 6 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 7 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 8 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 9 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 10 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('Too many clicks!')

    expect(container.innerHTML).toMatch('Restart')
  })

  test('should max out on "Click me (async)"', async () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 1 time'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 2 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 3 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 4 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 5 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 6 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 7 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 8 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 9 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('You clicked 10 times'))

    fireEvent.click(getByText('Click me (async)'))
    await wait(() => expect(container.innerHTML).toMatch('Too many clicks!'))

    expect(container.innerHTML).toMatch('Restart')
  })

  test('should max out and then restart"', () => {
    const { container, getByText } = render(<AppComponent />)

    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 1 time')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 2 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 3 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 4 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 5 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 6 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 7 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 8 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 9 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('You clicked 10 times')
    fireEvent.click(getByText('Click me'))
    expect(container.innerHTML).toMatch('Too many clicks!')

    expect(container.innerHTML).toMatch('Restart')

    fireEvent.click(getByText('Restart'))

    expect(container.innerHTML).toMatch('You have never clicked')
  })
})
