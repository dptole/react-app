import { useEffect, useState } from 'react'

const useProgrammingQuotesHook = () => {
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(false)
  const [quote, setQuote] = useState(false)
  const [quotes, setQuotes] = useState([])

  const doSearch = event => {
    event.preventDefault()

    if(quotes.length > 0) {
      selectOneQuote(quotes)
      return true
    }

    if(searching)
      // istanbul ignore next
      return false

    setSearching(true)

    return true
  }

  const selectOneQuote = async quotes => {
    const q = quotes.splice(quotes.length * Math.random() | 0, 1)

    if(!q)
      // istanbul ignore next
      return false

    const [{en: content, author}] = q

    const author_url = 'https://www.google.com/search?q=' + encodeURIComponent(author)

    setQuote({
      content,
      author,
      author_url
    })

    setQuotes(quotes)

    return true
  }

  const fetchQuotes = async () => {
    if(quotes.length > 0)
      // istanbul ignore next
      return await selectOneQuote(quotes)

    setQuote(false)
    setQuotes([])
    setError(false)

    try {
      const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/lang/en/')
      const json = await response.json()
      setQuotes(json)
      setSearching(false)
      return await selectOneQuote(json)
    } catch(error) {
      setSearching(false)
      setError(error?.message || 'Unknown error')
      return false
    }
  }

  useEffect(() => {
    searching && fetchQuotes()
    // eslint-disable-next-line
  }, [searching])

  return [{searching, error, quote}, {doSearch}]
}

export default useProgrammingQuotesHook
