import produce from 'immer'

import Action from 'logic/reducer/action'
import { initialState } from 'logic/reducer/initial'
import { Figure, FieldStatus, Color, State } from 'types'
import {
  between,
  isRightClickAllowed,
  oppositeColor,
  pos2str,
  str2pos,
} from 'logic/utils'
import { generateViews } from 'logic/views'

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'reset': {
      return produce(state, (draft) => {
        draft = initialState()
      })
    }

    case 'rotate': {
      return produce(state, (draft) => {
        draft.isBoardRotated = !state.isBoardRotated
      })
    }

    case 'field-right-click': {
      return produce(state, (draft) => {
        const { fields, turn, disableRightClick } = state
        const { clickPosition } = action

        if (disableRightClick) {
          return
        }

        if (isRightClickAllowed(fields, clickPosition, turn)) {
          draft.rightClickPosition = clickPosition
          return
        }

        draft.rightClickPosition = null
      })
    }

    case 'field-left-click': {
      return produce(state, (draft) => {
        const { rightClickPosition, views, fields, turn } = state
        const { clickPosition } = action

        if (rightClickPosition) {
          const currentView = views[rightClickPosition].view
          const status = currentView[clickPosition].status

          if (
            status === FieldStatus.AVAILABLE ||
            status === FieldStatus.NECESSARY
          ) {
            draft.fields[rightClickPosition].figure = Figure.NONE

            if (clickPosition.startsWith('0') && turn === Color.WHITE) {
              draft.fields[clickPosition].figure = Figure.WHITE_KING
            } else if (clickPosition.startsWith('7') && turn === Color.BLACK) {
              draft.fields[clickPosition].figure = Figure.BLACK_KING
            } else {
              draft.fields[clickPosition].figure =
                fields[rightClickPosition].figure
            }

            const oppTurn = oppositeColor(turn)
            if (status === FieldStatus.AVAILABLE) {
              draft.views = generateViews(draft.fields, oppTurn)
              draft.turn = oppTurn
              draft.rightClickPosition = null
            } else if (status === FieldStatus.NECESSARY) {
              const clickPos = str2pos(clickPosition)
              const killPosition = pos2str(
                between(str2pos(rightClickPosition), clickPos)
              )
              draft.fields[killPosition].figure = Figure.NONE

              const views = generateViews(draft.fields, turn)
              const view = views[clickPosition]

              if (view.kills === 0) {
                draft.disableRightClick = false
                draft.views = generateViews(draft.fields, oppTurn)
                draft.turn = oppTurn
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
