import { Color, Figure, Position, Fields } from 'types'

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

export const isFieldFigureGivenColor = (
  fields: Fields,
  position: string,
  color: Color
): boolean => {
  if (color === Color.WHITE) {
    return (
      fields[position].figure === Figure.WHITE ||
      fields[position].figure === Figure.WHITE_KING
    )
  }
  if (color === Color.BLACK) {
    return (
      fields[position].figure === Figure.BLACK ||
      fields[position].figure === Figure.BLACK_KING
    )
  }
  return false
}

export const isRightClickAllowed = (
  fields: Fields,
  position: string,
  turn: Color
): boolean => {
  return (
    (turn === Color.WHITE &&
      isFieldFigureGivenColor(fields, position, Color.WHITE)) ||
    (turn === Color.BLACK &&
      isFieldFigureGivenColor(fields, position, Color.BLACK))
  )
}

export const oppositeColor = (color: Color): Color => {
  return color === Color.WHITE ? Color.BLACK : Color.WHITE
}

export const between = (p1: Position, p2: Position): Position => {
  const [x1, y1] = p1
  const [x2, y2] = p2
  return [Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2)]
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

  eachByColor: (color: Color) => {
    if (color === Color.WHITE) {
      return [movements.whiteLeft, movements.whiteRight]
    }
    if (color === Color.BLACK) {
      return [movements.blackLeft, movements.blackRight]
    }
    return []
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

export const colorByFigure = (figure: Figure): Color => {
  if (figure === Figure.WHITE || figure === Figure.WHITE_KING) {
    return Color.WHITE
  }
  return Color.BLACK
}

export const isKing = (figure: Figure): boolean => {
  return figure === Figure.WHITE_KING || figure === Figure.BLACK_KING
}
