import { Figure, Position, Fields } from 'types'

/**
 * @returns a random integer between min (inclusive) and max (inclusive)
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const pos2str = ([x, y]: Position) => {
  return `${x}-${y}`
}

export const str2pos = (strPosition: string): Position => {
  const [xStr, yStr] = strPosition.split('-')
  return [Number(xStr), Number(yStr)]
}

export const iters = [0, 1, 2, 3, 4, 5, 6, 7]

export const iters2D = iters.flatMap((x) =>
  iters.map((y) => [x, y] as Position)
)

export const flatIters2D = iters2D.flatMap((position) => pos2str(position))

export const isFieldFigureByTurn = (
  fields: Fields,
  position: string,
  isWhiteTurn: boolean
): boolean => {
  if (isWhiteTurn) {
    return (
      fields[position].figure === Figure.WHITE ||
      fields[position].figure === Figure.WHITE_KING
    )
  }
  return (
    fields[position].figure === Figure.BLACK ||
    fields[position].figure === Figure.BLACK_KING
  )
}

export const isRightClickAllowed = (
  fields: Fields,
  position: string,
  isWhiteTurn: boolean
): boolean => {
  return (
    (isWhiteTurn && isFieldFigureByTurn(fields, position, isWhiteTurn)) ||
    (!isWhiteTurn && isFieldFigureByTurn(fields, position, isWhiteTurn))
  )
}

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

  eachByTurn: (isWhiteTurn: boolean) => {
    if (isWhiteTurn) {
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

export const isKing = (figure: Figure): boolean => {
  return figure === Figure.WHITE_KING || figure === Figure.BLACK_KING
}
