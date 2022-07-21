import produce from 'immer'

import Action from 'logic/reducer/action'
import { initialState } from 'logic/reducer/initial'
import { Figure, FieldStatus, Color, State } from 'types'
import {
  between,
  isFieldFigureGivenColor,
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
        const { fields, turn } = state
        const { clickPosition } = action

        if (
          (turn === Color.WHITE &&
            isFieldFigureGivenColor(fields, clickPosition, Color.WHITE)) ||
          (turn === Color.BLACK &&
            isFieldFigureGivenColor(fields, clickPosition, Color.BLACK))
        ) {
          draft.rightClickPosition = clickPosition
          draft.views = generateViews(fields, turn)
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

            if (status === FieldStatus.AVAILABLE) {
              draft.turn = oppositeColor(turn)
              draft.rightClickPosition = null
            } else if (status === FieldStatus.NECESSARY) {
              const killPosition = pos2str(
                between(str2pos(rightClickPosition), str2pos(clickPosition))
              )
              draft.fields[killPosition].figure = Figure.NONE
              draft.rightClickPosition = null // clickPosition
            }
          }
        }
      })
    }
  }
}

export default reducer
