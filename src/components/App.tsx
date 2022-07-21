import { useReducer } from 'react'
import reducer from 'logic/reducer/reducer'
import { initialState } from 'logic/reducer/initial'
import ChessBoard from 'components/ChessBoard'
import Menu from 'components/Menu'
import { FieldClickFn } from 'types'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const handleRotate = () => dispatch({ type: 'rotate' })

  const handleStartGame = () => {}

  const handleFieldClick: FieldClickFn = (position, type) => (event) => {
    event.preventDefault()
    dispatch({ type: `field-${type}-click`, clickPosition: position })
  }

  const isEnabledMenu = false

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Draughts game</h1>
      </header>
      <main>
        <ChessBoard state={state} onFieldClick={handleFieldClick} />
        <p>Right click to choose figure, left click to move</p>
        <button onClick={handleRotate}>Rotate board</button>
      </main>
      {isEnabledMenu && (
        <Menu playerVsPlayer={handleStartGame} playerVsAI={handleStartGame} />
      )}
    </div>
  )
}

export default App
