import { useReducer, MouseEvent } from 'react'

import { Position } from 'logic/types'
import reducer from 'logic/reducer/reducer'
import initialState from 'logic/reducer/state'
import ChessBoard from 'components/ChessBoard'
import Menu from 'components/Menu'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const handleFieldClick = (
    position: Position,
    event: MouseEvent<HTMLDivElement>,
    type: 'left' | 'right'
  ) => {
    event.preventDefault()
    dispatch({ type: `field-${type}-click`, position })
  }

  const playerVsPlayer = () =>
    dispatch({ type: 'change-game-state', gameState: 'running' })

  const playerVsAi = () =>
    dispatch({ type: 'change-game-state', gameState: 'running' })

  const rotate = () => dispatch({ type: 'rotate' })

  const enabledMenu = state.game.state === 'idle'

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Draughts game</h1>
      </header>
      <main>
        <ChessBoard
          turn={state.game.turn}
          rotated={state.rotated}
          figures={state.figures}
          fields={state.fields}
          supports={state.supports}
          onFieldClick={handleFieldClick}
        />
        <p>Right click to choose figure, left click to move</p>
        <button onClick={rotate}>Rotate board</button>
      </main>
      {enabledMenu && (
        <Menu
          title='Choose game mode'
          options={[
            { name: 'Player against Player', onClick: playerVsPlayer },
            { name: 'Player against AI', onClick: playerVsAi },
          ]}
        />
      )}
    </div>
  )
}

export default App
