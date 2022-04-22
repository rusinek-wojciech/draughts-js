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
