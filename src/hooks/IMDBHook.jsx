import { useEffect, useState } from 'react'

const useIMDBHook = () => {
  const [apikey, setAPIKey] = useState('')
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [output, setOutput] = useState({})
  const [page, setPage] = useState(1)

  const updateAPIKey = event =>
    setAPIKey(event?.target?.value)

  const updateSearch = event =>
    setSearch(event?.target?.value)

  const doSearch = event => {
    event.preventDefault()

    if(searching)
      return false

    setSearching(true)
    setOutput({})

    return true
  }

  const doPaginatedSearch = new_page => event => {
    if(searching)
      return false

    setPage(new_page)
    setSearching(true)

    return true
  }

  const newSearch = event => {
    setSearching(false)
    setOutput({})
  }

  const fetchMovie = async (apikey, search, page) => {
    const url = `https://www.omdbapi.com/?apikey=${apikey}&s=${search}&page=${page}`

    await sleep(1)

    try {
      const response = await fetch(url, {mode: 'cors'})
      setSearching(false)
      const text = await response.json()
      setOutput(text)
    } catch(error) {
      setSearching(false)
      setPage(1)
      setOutput(error.message)
    }
  }

  useEffect(() => {
    searching && fetchMovie(apikey, search, page)
    // eslint-disable-next-line
  }, [searching])

  return [{apikey, search, searching, output, page}, {updateAPIKey, updateSearch, doSearch, doPaginatedSearch, newSearch}]
}

const sleep = async seconds =>
  await new Promise(r => setTimeout(r, seconds * 1e3))

export default useIMDBHook
