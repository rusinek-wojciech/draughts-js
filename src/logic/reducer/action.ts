import { GameState } from 'logic/reducer/state'
import { Position } from 'logic/types'

type Action =
  | { type: 'field-left-click'; position: Position }
  | { type: 'field-right-click'; position: Position }
  | { type: 'change-game-state'; gameState: GameState }
  | { type: 'reset' }
  | { type: 'rotate' }

export default Action
