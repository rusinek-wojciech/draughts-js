import { BOARD_SIZE, DATA, VIEW } from '../config/enum'

const directions = [
  (i: number, j: number): number[] => [--i, --j],
  (i: number, j: number): number[] => [--i, ++j],
  (i: number, j: number): number[] => [++i, --j],
  (i: number, j: number): number[] => [++i, ++j],
]

const validate = (i: number, j: number): boolean =>
  i >= 0 && j >= 0 && i < BOARD_SIZE && j < BOARD_SIZE

const isEnemy = (elem: number, isWhiteTurn: boolean): boolean => {
  return isWhiteTurn
    ? elem === DATA.BLACK || elem === DATA.BLACK_KING
    : elem === DATA.WHITE || elem === DATA.WHITE_KING
}

export const isAlly = (elem: number, isWhiteTurn: boolean): boolean => {
  return isWhiteTurn
    ? elem === DATA.WHITE || elem === DATA.WHITE_KING
    : elem === DATA.BLACK || elem === DATA.BLACK_KING
}

const isKing = (elem: number): boolean =>
  elem === DATA.WHITE_KING || elem === DATA.BLACK_KING

const isMinion = (elem: number): boolean =>
  elem === DATA.WHITE || elem === DATA.BLACK

export const createEmptyMatrix = (): number[][] =>
  Array<number>(BOARD_SIZE)
    .fill(0)
    .map(() => Array<number>(BOARD_SIZE).fill(VIEW.EMPTY))

export class View {
  public i: number
  public j: number
  public requireKill: boolean
  public isBlocked: boolean
  public matrix: number[][]

  constructor(i: number, j: number, data: number[][], isWhiteTurn: boolean) {
    this.i = i
    this.j = j
    this.requireKill = false
    this.isBlocked = false
    this.matrix = this.createMatrix(i, j, data, isWhiteTurn)
  }

  createMatrix(
    i: number,
    j: number,
    data: number[][],
    isWhiteTurn: boolean
  ): number[][] {
    let counter = 0
    let view = createEmptyMatrix()

    if (isAlly(data[i][j], isWhiteTurn)) {
      view[i][j] = VIEW.ACTUAL

      if (isKing(data[i][j])) {
        directions.forEach((dir) => {
          let [di, dj] = dir(i, j)
          while (validate(di, dj)) {
            if (isAlly(data[di][dj], isWhiteTurn)) {
              break
            } else if (isEnemy(data[di][dj], isWhiteTurn)) {
              let [x, y] = dir(di, dj)
              while (validate(x, y) && data[x][y] === DATA.EMPTY) {
                view[di][dj] = VIEW.KILLABLE
                view[x][y] = VIEW.NECESSARY
                ;[x, y] = dir(x, y)
                counter++
              }
              break
            } else {
              view[di][dj] = VIEW.AVAILABLE
              counter++
            }
            ;[di, dj] = dir(di, dj)
          }
        })
      } else if (isMinion(data[i][j])) {
        directions.forEach((dir) => {
          let [di, dj] = dir(i, j)
          if (validate(di, dj)) {
            if (isAlly(data[di][dj], isWhiteTurn)) {
              // nothing
            } else if (isEnemy(data[di][dj], isWhiteTurn)) {
              let [x, y] = dir(di, dj)
              if (validate(x, y) && data[x][y] === DATA.EMPTY) {
                view[di][dj] = VIEW.KILLABLE
                view[x][y] = VIEW.NECESSARY
                counter++
              }
            } else {
              view[di][dj] = VIEW.AVAILABLE
              counter++
            }
          }
        })
      }

      // clean view
      if (view.some((row) => row.includes(VIEW.NECESSARY))) {
        this.requireKill = true
        view = view.map((row) =>
          row.map((elem) => {
            if (elem === VIEW.AVAILABLE) {
              elem = VIEW.EMPTY
              counter--
            }
            return elem
          })
        )
      } else if (isWhiteTurn && isMinion(data[i][j])) {
        view = view.map((row, di) =>
          row.map((elem) => {
            if (i < di) {
              if (elem !== VIEW.EMPTY) {
                elem = VIEW.EMPTY
                counter--
              }
            }
            return elem
          })
        )
      } else if (!isWhiteTurn && isMinion(data[i][j])) {
        view = view.map((row, di) =>
          row.map((elem) => {
            if (i > di) {
              if (elem !== VIEW.EMPTY) {
                elem = VIEW.EMPTY
                counter--
              }
            }
            return elem
          })
        )
      }
    }

    if (counter === 0) {
      this.isBlocked = true
    }

    return view
  }
}
