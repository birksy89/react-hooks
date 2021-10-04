// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import ErrorBoundary from '../errorboundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  React.useEffect(() => {
    if (!pokemonName) return

    setState({pokemon: null, status: 'pending'})

    // setStatus('pending')

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        console.log(pokemonData)
        // setPokemon(pokemonData)
        // setStatus('resolved')
        setState({pokemon: pokemonData, status: 'resolved'})
      })
      .catch(error => {
        // setError(error)
        // setStatus('rejected')
        setState({error: error, status: 'rejected'})
      })
  }, [pokemonName])

  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  if (state.status === 'rejected') throw state.error.message
  // return (
  //   <div role="alert">
  //     There was an error:{' '}
  //     <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
  //   </div>
  // )

  //   1. no pokemonName: 'Submit a pokemon'
  if (state.status === 'idle') return 'Submit a pokemon'

  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  if (state.status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />

  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  return <PokemonDataView pokemon={state.pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
