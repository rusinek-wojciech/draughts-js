import { Board } from 'logic/board'
import { Color, Status } from 'types'

export interface State {
  rightClickPosition: string | null
  disableRightClick: boolean
  isBoardRotated: boolean
  status: Status
  turn: Color
  board: Board
}

export const initialState = (): State => {
  const initialTurn = Color.WHITE
  return {
    rightClickPosition: null,
    disableRightClick: true,
    isBoardRotated: false,
    status: Status.NONE,
    turn: initialTurn,
    board: new Board(initialTurn),
  }
}
