import { Position, Color } from 'types'

export const movements = {
  validate: ([x, y]: Position): boolean => x >= 0 && y >= 0 && x < 8 && y < 8,

  whiteLeft: ([x, y]: Position): Position | null => {
    const dp: Position = [x - 1, y - 1]
    return movements.validate(dp) ? dp : null
  },

  whiteRight: ([x, y]: Position): Position | null => {
    const dp: Position = [x - 1, y + 1]
    return movements.validate(dp) ? dp : null
  },

  blackLeft: ([x, y]: Position): Position | null => {
    const dp: Position = [x + 1, y - 1]
    return movements.validate(dp) ? dp : null
  },

  blackRight: ([x, y]: Position): Position | null => {
    const dp: Position = [x + 1, y + 1]
    return movements.validate(dp) ? dp : null
  },

  eachByTurn: (turn: Color) => {
    if (turn === Color.WHITE) {
      return [movements.whiteLeft, movements.whiteRight]
    }
    return [movements.blackLeft, movements.blackRight]
  },

  each: () => {
    return [
      movements.whiteLeft,
      movements.whiteRight,
      movements.blackLeft,
      movements.blackRight,
    ]
  },
}
