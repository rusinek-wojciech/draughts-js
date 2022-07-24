import produce from 'immer'

import { Action, ActionType } from 'logic/reducer/action'
import { initialState } from 'logic/reducer/initial'
import { Figure, FieldStatus, State, Status } from 'types'
import { isRightClickAllowed } from 'logic/utils'
import { generateViews } from 'logic/views'

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
        const { fields, isWhiteTurn, disableRightClick } = state
        const { clickPosition } = action

        if (disableRightClick) {
          return
        }

        if (isRightClickAllowed(fields, clickPosition, isWhiteTurn)) {
          draft.rightClickPosition = clickPosition
          return
        }

        draft.rightClickPosition = null
      })
    }

    case ActionType.FIELD_LEFT_CLICK: {
      return produce(state, (draft) => {
        const { rightClickPosition, views, fields, isWhiteTurn } = state
        const { clickPosition } = action

        if (rightClickPosition) {
          const currentView = views[rightClickPosition].view
          const { status, killPosition } = currentView[clickPosition]

          if (
            status === FieldStatus.AVAILABLE ||
            status === FieldStatus.NECESSARY
          ) {
            draft.fields[rightClickPosition].figure = Figure.NONE

            if (clickPosition.startsWith('0') && isWhiteTurn) {
              draft.fields[clickPosition].figure = Figure.WHITE_KING
            } else if (clickPosition.startsWith('7') && !isWhiteTurn) {
              draft.fields[clickPosition].figure = Figure.BLACK_KING
            } else {
              draft.fields[clickPosition].figure =
                fields[rightClickPosition].figure
            }

            if (status === FieldStatus.AVAILABLE) {
              draft.views = generateViews(draft.fields, !isWhiteTurn)
              draft.isWhiteTurn = !isWhiteTurn
              draft.rightClickPosition = null
            } else if (status === FieldStatus.NECESSARY) {
              draft.fields[killPosition!].figure = Figure.NONE

              const views = generateViews(draft.fields, isWhiteTurn)

              if (views[clickPosition].kills === 0) {
                draft.disableRightClick = false
                draft.views = generateViews(draft.fields, !isWhiteTurn)
                draft.isWhiteTurn = !isWhiteTurn
              } else {
                draft.disableRightClick = true
                draft.views = views
                draft.rightClickPosition = clickPosition
              }
            }
          }
        }
      })
    }
  }
}

export default reducer
