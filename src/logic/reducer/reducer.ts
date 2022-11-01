import produce from 'immer'

import { Action, ActionType } from 'logic/reducer/action'
import { Figure, FieldStatus, Status, Color } from 'types'
import { isRightClickAllowed } from 'logic/utils'
import { State, initialState } from 'logic/reducer/state'

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_STATUS: {
      return produce(state, (draft) => {
        draft.status = action.status

        if (action.status === Status.NONE) {
          draft.disableRightClick = true
        } else if (action.status === Status.PLAYER_VS_PLAYER) {
          draft.disableRightClick = false
        }
      })
    }

    case ActionType.RESET: {
      return initialState()
    }

    case ActionType.ROTATE: {
      return produce(state, (draft) => {
        draft.isBoardRotated = !state.isBoardRotated
      })
    }

    case ActionType.FIELD_RIGHT_CLICK: {
      return produce(state, (draft) => {
        const { board, turn, disableRightClick } = state
        const { clickPosition } = action

        if (disableRightClick) {
          return
        }

        const figure = board.figure(clickPosition)
        if (isRightClickAllowed(figure, turn)) {
          draft.rightClickPosition = clickPosition
          return
        }

        draft.rightClickPosition = null
      })
    }

    case ActionType.FIELD_LEFT_CLICK: {
      return produce(state, (draft) => {
        const { rightClickPosition, board, turn } = state
        const { clickPosition } = action

        if (rightClickPosition) {
          const isTurnEnd = board.move(rightClickPosition, clickPosition, turn)

          if (isTurnEnd) {
            draft.turn = turn === Color.WHITE ? Color.BLACK : Color.WHITE
            draft.rightClickPosition = null
          } else  {
            draft.fields[killPosition!].figure = Figure.NONE

            const views = generateViews(draft.fields, isWhiteTurn)

            if (views[clickPosition].availableKills === 0) {
              draft.disableRightClick = false
              draft.board = generateViews(draft.fields, !isWhiteTurn)
              draft.isWhiteTurn = !isWhiteTurn
            } else {
              draft.disableRightClick = true
              draft.board = views
              draft.rightClickPosition = clickPosition
            }
          }

          draft.board = board
        }
      })
    }
  }
}

export default reducer
