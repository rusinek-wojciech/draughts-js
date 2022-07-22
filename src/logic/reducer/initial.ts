import { Figure, FieldStatus, Color, Fields, State, View } from 'types'
import { flatIters2D } from 'logic/utils'
import { generateViews } from 'logic/views'

export const initialView = (): View => {
  return flatIters2D
    .map((pos) => ({
      [pos]: {
        status: FieldStatus.NONE,
      },
    }))
    .reduce(
      (obj, acc) => ({
        ...acc,
        ...obj,
      }),
      {}
    )
}

export const emptyInitialView = initialView()

export const initialFields = (): Fields => {
  return {
    // row-0
    '0-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '0-1': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '0-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '0-3': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '0-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '0-5': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '0-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '0-7': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    // row-1
    '1-0': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '1-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '1-2': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '1-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '1-4': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '1-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '1-6': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '1-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    // row-2
    '2-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '2-1': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '2-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '2-3': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '2-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '2-5': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    '2-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '2-7': {
      color: Color.BLACK,
      figure: Figure.BLACK,
    },
    // row-3
    '3-0': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '3-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '3-2': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '3-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '3-4': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '3-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '3-6': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '3-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    // row-4
    '4-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '4-1': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '4-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '4-3': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '4-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '4-5': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    '4-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '4-7': {
      color: Color.BLACK,
      figure: Figure.NONE,
    },
    // row-5
    '5-0': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '5-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '5-2': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '5-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '5-4': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '5-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '5-6': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '5-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    // row-6
    '6-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '6-1': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '6-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '6-3': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '6-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '6-5': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '6-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '6-7': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    // row-7
    '7-0': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '7-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '7-2': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '7-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '7-4': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '7-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
    '7-6': {
      color: Color.BLACK,
      figure: Figure.WHITE,
    },
    '7-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
    },
  }
}

export const initialState = (): State => {
  const isWhiteTurn = true
  const fields = initialFields()
  const views = generateViews(fields, isWhiteTurn)
  return {
    rightClickPosition: null,
    disableRightClick: false,
    isBoardRotated: false,
    isWhiteTurn,
    fields,
    views,
  }
}
