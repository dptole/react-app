import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ClicksComponent from '../components/ClicksComponent'

const CLICK_ASYNC_WAIT = 30e3

describe('ClicksComponent', () => {
  test('should click button "Click me" twice', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click = getByText('Click me')

    await fireEvent.click(button_click)
    await fireEvent.click(button_click)

    expect(container.innerHTML).toMatch('You clicked 2 times')
  })

  test('should click button "Click me (async)" and see "Adding..."', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click_async = getByText('Click me (async)')

    await fireEvent.click(button_click_async)

    expect(container.innerHTML).toMatch('Adding...')
  }, CLICK_ASYNC_WAIT)

  test('should click button "Click me (async)" and wait', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click_async = getByText('Click me (async)')

    await fireEvent.click(button_click_async)

    expect(container.innerHTML).toMatch('Adding...')

    await wait(() => expect(container.innerHTML).toMatch('You clicked once'))
  }, CLICK_ASYNC_WAIT)

  test('should max out on "Click me"', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click = getByText('Click me')

    await fireEvent.click(button_click)
    expect(container.innerHTML).toMatch('You clicked once')

    let i = 2
    while(i < 11) {
      await fireEvent.click(button_click)
      expect(container.innerHTML).toMatch(`You clicked ${i} times`)
      i++
    }

    await fireEvent.click(button_click)
    expect(container.innerHTML).toMatch('Too many clicks!')

    expect(container.innerHTML).toMatch('Restart')
  })

  test('should max out on "Click me (async)"', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click_async = getByText('Click me (async)')

    await fireEvent.click(button_click_async)
    await wait(() => expect(container.innerHTML).toMatch('You clicked once'))

    let i = 2
    while(i < 11) {
      await fireEvent.click(button_click_async)
      await wait(() => expect(container.innerHTML).toMatch(`You clicked ${i} times`))
      i++
    }

    await fireEvent.click(button_click_async)
    await wait(() => expect(container.innerHTML).toMatch('Too many clicks!'))

    expect(container.innerHTML).toMatch('Restart')
  }, CLICK_ASYNC_WAIT)

  test('should max out clicking "Click me" and then restart"', async () => {
    const { container, getByText } = render(<ClicksComponent />)
    const button_click = getByText('Click me')

    await fireEvent.click(button_click)
    expect(container.innerHTML).toMatch('You clicked once')

    let i = 2
    while(i < 11) {
      await fireEvent.click(button_click)
      expect(container.innerHTML).toMatch(`You clicked ${i} times`)
      i++
    }

    await fireEvent.click(button_click)
    expect(container.innerHTML).toMatch('Too many clicks!')

    expect(container.innerHTML).toMatch('Restart')

    await fireEvent.click(getByText('Restart'))

    expect(container.innerHTML).toMatch('You have never clicked')
  })
})
