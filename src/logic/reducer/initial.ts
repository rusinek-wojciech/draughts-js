import { Figure, FieldStatus, Color, Fields, State, View } from 'types'
import { flatIters2D, iters2D } from 'logic/utils'

export const initialView = (): View => {
  return flatIters2D
    .map((pos, j) => ({
      [pos]: {
        position: iters2D[j],
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

export const initialFields = (): Fields => {
  return {
    // row-0
    '0-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [0, 0],
    },
    '0-1': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [0, 1],
    },
    '0-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [0, 2],
    },
    '0-3': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [0, 3],
    },
    '0-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [0, 4],
    },
    '0-5': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [0, 5],
    },
    '0-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [0, 6],
    },
    '0-7': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [0, 7],
    },
    // row-1
    '1-0': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [1, 0],
    },
    '1-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [1, 1],
    },
    '1-2': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [1, 2],
    },
    '1-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [1, 3],
    },
    '1-4': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [1, 4],
    },
    '1-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [1, 5],
    },
    '1-6': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [1, 6],
    },
    '1-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [1, 7],
    },
    // row-2
    '2-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [2, 0],
    },
    '2-1': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [2, 1],
    },
    '2-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [2, 2],
    },
    '2-3': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [2, 3],
    },
    '2-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [2, 4],
    },
    '2-5': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [2, 5],
    },
    '2-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [2, 6],
    },
    '2-7': {
      color: Color.BLACK,
      figure: Figure.BLACK,
      position: [2, 7],
    },
    // row-3
    '3-0': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [3, 0],
    },
    '3-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [3, 1],
    },
    '3-2': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [3, 2],
    },
    '3-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [3, 3],
    },
    '3-4': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [3, 4],
    },
    '3-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [3, 5],
    },
    '3-6': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [3, 6],
    },
    '3-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [3, 7],
    },
    // row-4
    '4-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [0, 0],
    },
    '4-1': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [4, 1],
    },
    '4-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [4, 2],
    },
    '4-3': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [4, 3],
    },
    '4-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [4, 4],
    },
    '4-5': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [4, 5],
    },
    '4-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [4, 6],
    },
    '4-7': {
      color: Color.BLACK,
      figure: Figure.NONE,
      position: [4, 7],
    },
    // row-5
    '5-0': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [5, 0],
    },
    '5-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [5, 1],
    },
    '5-2': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [5, 2],
    },
    '5-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [5, 3],
    },
    '5-4': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [5, 4],
    },
    '5-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [5, 5],
    },
    '5-6': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [5, 6],
    },
    '5-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [5, 7],
    },
    // row-6
    '6-0': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [6, 0],
    },
    '6-1': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [6, 1],
    },
    '6-2': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [6, 2],
    },
    '6-3': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [6, 3],
    },
    '6-4': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [6, 4],
    },
    '6-5': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [6, 5],
    },
    '6-6': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [6, 6],
    },
    '6-7': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [6, 7],
    },
    // row-7
    '7-0': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [7, 0],
    },
    '7-1': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [7, 1],
    },
    '7-2': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [7, 2],
    },
    '7-3': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [7, 3],
    },
    '7-4': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [7, 4],
    },
    '7-5': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [7, 5],
    },
    '7-6': {
      color: Color.BLACK,
      figure: Figure.WHITE,
      position: [7, 6],
    },
    '7-7': {
      color: Color.WHITE,
      figure: Figure.NONE,
      position: [7, 7],
    },
  }
}

export const initialState = (): State => ({
  rightClickPosition: null,
  isBoardRotated: false,
  turn: Color.WHITE,
  fields: initialFields(),
  views: {},
})
