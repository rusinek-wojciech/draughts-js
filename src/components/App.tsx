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
      <footer className='footer'>
        <header>
          <h1>How to play?</h1>
          <p>
            Your goal is to eliminate enemy pawns. Shadow on the edge of board
            shows which player has turn. Use <i>right click</i> to select pawn.
            Then use <i>left click</i> to select one of available move.
          </p>
        </header>
      </footer>
    </div>
  )
}

export default App
