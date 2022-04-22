import { Fields, Figures, Position, Supports } from 'logic/types'

export type GameState = 'idle' | 'complete' | 'running'

export interface State {
  rightPosition?: Position
  figures: Figures
  fields: Fields
  supports: Supports
  rotated: boolean
  game: {
    state: GameState
    turn: 'white' | 'black'
  }
}

export const initialFigures = (): Figures => [
  ['none', 'black', 'none', 'black', 'none', 'black', 'none', 'black'],
  ['black', 'none', 'black', 'none', 'black', 'none', 'black', 'none'],
  ['none', 'black', 'none', 'black', 'none', 'black', 'none', 'black'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['white', 'none', 'white', 'none', 'white', 'none', 'white', 'none'],
  ['none', 'white', 'none', 'white', 'none', 'white', 'none', 'white'],
  ['white', 'none', 'white', 'none', 'white', 'none', 'white', 'none'],
]

export const initialSupports = (): Supports => [
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
]

export const initialFields = (): Fields => [
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
]

const initialState = (): State => ({
  figures: initialFigures(),
  fields: initialFields(),
  supports: initialSupports(),
  rotated: false,
  game: {
    state: 'idle',
    turn: 'white',
  },
})

export default initialState
