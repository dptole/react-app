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
      return false

    setSearching(true)

    return true
  }

  const selectOneQuote = async quotes => {
    const q = quotes.splice(quotes.length * Math.random() | 0, 1)

    if(!q) return false

    const [{en: content, author}] = q

    const author_url = 'https://www.google.com/search?q=' + encodeURIComponent(author)

    setQuote({
      content,
      author,
      author_url
    })

    return true
  }

  const fetchQuotes = () => {
    if(quotes.length > 0)
      return selectOneQuote(quotes)

    setQuote(false)
    setQuotes([])
    setError(false)

    return fetch('https://programming-quotes-api.herokuapp.com/quotes/lang/en/').then(response =>
      response.json()
    ).then(json => {
      setQuotes(json)
      setSearching(false)
      return selectOneQuote(json)
    }).catch(error => {
      setSearching(false)
      setQuotes(error?.message || 'Unknown error')
    })
  }

  useEffect(() => {
    searching && fetchQuotes()
    // eslint-disable-next-line
  }, [searching])

  return [{searching, error, quote}, {doSearch}]
}

export default useProgrammingQuotesHook
