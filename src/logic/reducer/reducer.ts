import produce from 'immer'

import Action from 'logic/reducer/action'
import initialState, { initialSupports, State } from 'logic/reducer/state'
import { Position } from 'logic/types'
import { size } from 'logic/utils'

/** directions */
type DirectionFn = (p: Position) => Position
const NE: DirectionFn = (p) => ({ x: p.x + 1, y: p.y - 1 })
const NW: DirectionFn = (p) => ({ x: p.x - 1, y: p.y - 1 })
const SE: DirectionFn = (p) => ({ x: p.x + 1, y: p.y + 1 })
const SW: DirectionFn = (p) => ({ x: p.x - 1, y: p.y + 1 })

const validate = (p: Position): boolean =>
  p.x >= 0 && p.y >= 0 && p.x < size && p.y < size

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'field-left-click': {
      const { x, y } = action.position
      const { rightPosition: p } = state
      const support = state.supports[y][x]
      const { turn } = state.game

      return produce(state, (draft) => {
        draft.supports = initialSupports()

        // kill enemy minion
        if (!!p && support === 'necessary') {
          draft.figures[(y + p.y) / 2][(x + p.x) / 2] = 'none'
        }

        // move minion to new field
        if (!!p && (support === 'available' || support === 'necessary')) {
          if (turn === 'white') {
            // promote to white king
            if (y === 0) {
              draft.figures[y][x] = 'white-king'
              draft.figures[p.y][p.x] = 'none'
            } else {
              draft.figures[y][x] = draft.figures[p.y][p.x]
              draft.figures[p.y][p.x] = 'none'
            }
            draft.game.turn = 'black'
          }

          if (turn === 'black') {
            // promote to black king
            if (y === size - 1) {
              draft.figures[y][x] = 'black-king'
              draft.figures[p.y][p.x] = 'none'
            } else {
              draft.figures[y][x] = draft.figures[p.y][p.x]
              draft.figures[p.y][p.x] = 'none'
            }
            draft.game.turn = 'white'
          }
        }
      })
    }

    case 'field-right-click': {
      const { x, y } = action.position

      return produce(state, (draft) => {
        const findKillable = (
          x: number,
          y: number,
          dirs: DirectionFn[]
        ): boolean => {
          return dirs.some((dir) => {
            const p = dir({ x, y })
            const dp = dir(p)

            if (
              validate(p) &&
              validate(dp) &&
              (state.figures[p.y][p.x] === 'black' ||
                state.figures[p.y][p.x] === 'black-king') &&
              state.figures[dp.y][dp.x] === 'none'
            ) {
              draft.supports[p.y][p.x] = 'killable'
              draft.supports[dp.y][dp.x] = 'necessary'
              const newDirs = dirs.filter((d) => d !== dir)
              findKillable(dp.x, dp.y, newDirs)
              return true
            }
            return false
          })
        }

        const findMoveable = (
          x: number,
          y: number,
          dirs: DirectionFn[],
          limited: boolean = true
        ) => {
          dirs.forEach((dir) => {
            let p = { x, y }
            while (true) {
              p = dir(p)
              if (!(validate(p) && state.figures[p.y][p.x] === 'none')) {
                break
              }
              draft.supports[p.y][p.x] = 'available'
              if (limited) {
                break
              }
            }
          })
        }

        draft.supports = initialSupports()

        if (state.game.turn === 'white' && state.figures[y][x] === 'white') {
          draft.supports[y][x] = 'actual'
          draft.rightPosition = action.position

          if (!findKillable(x, y, [NE, NW, SE, SW])) {
            findMoveable(x, y, [NE, NW])
          }
        }

        if (state.game.turn === 'black' && state.figures[y][x] === 'black') {
          draft.supports[y][x] = 'actual'
          draft.rightPosition = action.position

          if (!findKillable(x, y, [NE, NW, SE, SW])) {
            findMoveable(x, y, [SE, SW])
          }
        }

        if (
          state.game.turn === 'white' &&
          state.figures[y][x] === 'white-king'
        ) {
          draft.supports[y][x] = 'actual'
          draft.rightPosition = action.position

          if (!findKillable(x, y, [NE, NW, SE, SW])) {
            findMoveable(x, y, [NE, NW, SE, SW], false)
          }
        }

        if (
          state.game.turn === 'black' &&
          state.figures[y][x] === 'black-king'
        ) {
          draft.supports[y][x] = 'actual'
          draft.rightPosition = action.position

          if (!findKillable(x, y, [NE, NW, SE, SW])) {
            findMoveable(x, y, [NE, NW, SE, SW], false)
          }
        }
      })
    }

    case 'change-game-state': {
      return produce(state, (draft) => {
        draft.game.state = action.gameState
      })
    }

    case 'reset': {
      return initialState()
    }

    case 'rotate': {
      return produce(state, (draft) => {
        draft.rotated = !draft.rotated
      })
    }
  }
}

export default reducer
