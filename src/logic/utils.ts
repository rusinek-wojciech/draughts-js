import { Figure, Position, Color } from 'types'

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

export const isRightClickAllowed = (
  figure: Figure | null,
  turn: Color
): boolean => {
  return (
    (turn === Color.WHITE && !!figure && figure.color === Color.WHITE) ||
    (turn === Color.BLACK && !!figure && figure.color === Color.BLACK)
  )
}
