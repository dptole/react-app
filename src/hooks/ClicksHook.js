import { useEffect, useState } from 'react'

const useClicksHook = () => {
  const [count, setCount] = useState(0)
  const [thinking, setThinking] = useState(false)
  const [visible, setVisible] = useState(true)

  const restart = () => {
    setVisible(true)
  }

  const increaseAsync = () => {
    setThinking(true)
  }

  const increase = () => {
    setCount(old_count => old_count + 1)
  }

  useEffect(() => {
    if(visible)
      document.title = 'Clicks: ' + count

    if(count > 10) {
      document.title = 'Maxed out!'
      setVisible(false)
    }

    // eslint-disable-next-line
  }, [count])

  useEffect(() => {
    let timeout = null

    if(thinking === true)
      timeout = setTimeout(() => {
        if(visible) {
          setThinking(false)
          increase()
        }
      }, 300 + Math.random() * 200)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [thinking])

  useEffect(() => {
    if(visible === true) {
      setCount(0)
      setThinking(false)
      setVisible(true)
    }
  }, [visible])

  return [{count, thinking, visible}, {increase, increaseAsync, restart}]
}

export default useClicksHook
