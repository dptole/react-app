import { useEffect, useState } from 'react'

const useMyAnimeListHook = () => {
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [search_type, setSearchType] = useState('manga')
  const [page, setPage] = useState(1)
  const [output, setOutput] = useState({})

  const updateSearch = event =>
    setSearch(event?.target?.value)

  const doSearchManga = event => {
    setSearchType('manga')
    return doSearch(event)
  }

  const doSearchAnime = event => {
    setSearchType('anime')
    return doSearch(event)
  }

  const doSearch = event => {
    event.preventDefault()

    if(searching)
      // istanbul ignore next
      return false

    setSearching(true)

    return true
  }

  const doPaginatedSearch = new_page => event => {
    if(searching)
      // istanbul ignore next
      return false

    setPage(new_page)
    setSearching(true)

    return true
  }

  const newSearch = event => {
    setSearching(false)
    setOutput({})
  }

  const fetchResource = async (search, search_type) => {
    search = encodeURIComponent(search)
    const url = `https://api.jikan.moe/v3/search/${search_type}?q=${search}&page=${page}`

    try {
      const response = await fetch(url, {mode: 'cors'})
      setSearching(false)
      const json = await response.json()
      setOutput(json)
    } catch(error) {
      setSearching(false)
      setPage(1)
      setOutput(error)
    }
  }

  useEffect(() => {
    searching && fetchResource(search, search_type)
    // eslint-disable-next-line
  }, [searching])

  return [{search, searching, search_type, output, page}, {doSearchAnime, doSearchManga, updateSearch, doPaginatedSearch, newSearch}]
}

export default useMyAnimeListHook
