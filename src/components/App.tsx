import { useState, MouseEvent } from 'react'

import ChessBoard from 'components/ChessBoard'
import { Board } from 'logic/utils'
import Menu from 'components/Menu'

type GameState =
  | 'white-turn'
  | 'black-turn'
  | 'white-win'
  | 'black-win'
  | 'prepare'

interface Position {
  x: number
  y: number
}

const getSupportFields = (
  { x, y }: Position,
  board: Board,
  state: GameState
) => {
  const field = board.field(x, y)
  if (field.owner === 'black' && state === 'black-turn') {
    field.support = 'actual'
  }
  if (field.owner === 'white' && state === 'white-turn') {
    field.support = 'actual'
  }
}

const App = () => {
  const [gameState, setGameState] = useState<GameState>('prepare')
  const [board, setBoard] = useState<Board>(new Board())
  const [position, setPosition] = useState<Position>()

  const handleFieldClick = (
    x: number,
    y: number,
    e: MouseEvent<HTMLDivElement>
  ) => {
    getSupportFields({ x, y }, board, gameState)
    setBoard(board)
  }

  const playerVsPlayer = () => {
    setGameState('white-turn')
    setBoard(new Board())
  }

  const playerVsAi = () => {
    setGameState('white-turn')
    setBoard(new Board())
  }

  const menuEnabled =
    gameState === 'white-win' ||
    gameState === 'black-win' ||
    gameState === 'prepare'

  const winMessage =
    gameState === 'white-win'
      ? 'The winner is WHITE!'
      : gameState === 'black-win'
      ? 'The winner is BLACK!'
      : 'Choose gamemode'

  const playMessage =
    gameState === 'white-turn'
      ? 'White round'
      : gameState === 'black-turn'
      ? 'Black round'
      : '...'

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Draughts game!</h1>
      </header>
      <main>
        <ChessBoard board={board} onFieldClick={handleFieldClick} />
        <p>{playMessage}</p>
        <Menu
          enabled={menuEnabled}
          message={winMessage}
          playerVsPlayer={playerVsPlayer}
          playerVsAi={playerVsAi}
        />
        <button onClick={() => {}}>Rotate board</button>
      </main>
    </div>
  )
}

export default App
