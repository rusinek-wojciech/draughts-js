import { Fields, Figures, Supports } from 'logic/types'

export const size = 8

/**
 * allows to render board length JSX
 */
export const multipleRender = (fn: (key: number) => JSX.Element) => {
  return [...Array(size)].fill(null).map((_, i) => fn(i))
}

/**
 * @returns a random integer between min (inclusive) and max (inclusive)
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const initialFigures = (): Figures => [
  ['none', 'black', 'none', 'black', 'none', 'black', 'none', 'black'],
  ['black', 'none', 'black', 'none', 'black', 'none', 'black', 'none'],
  ['none', 'black', 'none', 'black', 'none', 'black', 'none', 'black'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['white', 'none', 'white', 'none', 'white', 'none', 'white', 'none'],
  ['none', 'white', 'none', 'white', 'none', 'white', 'none', 'white'],
  ['white', 'none', 'white', 'none', 'white', 'none', 'white', 'none'],
]

export const initialSupports = (): Supports => [
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
]

export const initialFields = (): Fields => [
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
  ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
  ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
]
