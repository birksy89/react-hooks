// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    setName(initialName)
  }, [initialName])

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [initalName, setInitialname] = React.useState('Billy')
  return (
    <>
      <Greeting initialName={initalName} />

      <button onClick={() => setInitialname('William')}>
        Change Initial Name
      </button>
    </>
  )
}

export default App
