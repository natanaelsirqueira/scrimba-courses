import React, { useState, useCallback } from 'react'

import MovieCard from './MovieCard'

const SearchMovies = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const handleSearchMovie = useCallback(async (event) => {
    event.preventDefault()

    const url = new URL('https://api.themoviedb.org/3/search/movie')

    const params = {
      query,
      api_key: 'my_api_key',
      language: 'en-US',
      page: 1,
      include_adult: false
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    try {
      const response = await fetch(url)
      const data = await response.json()

      setMovies(data.results.filter(movie => movie.poster_path))
    } catch (err) {
      console.error(err)
    }
  }, [query])

  return (
    <>
      <form className="form" onSubmit={handleSearchMovie}>
        <label className="label" htmlFor="query">Movie name</label>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input"
          type="text"
          name="query"
          placeholder="e.g. Fight Club"
        />

        <button className="button" type="submit">Search</button>
      </form>

      <div className="card-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default SearchMovies
