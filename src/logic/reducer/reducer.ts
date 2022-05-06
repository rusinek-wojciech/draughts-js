import produce from 'immer'
import { WritableDraft } from 'immer/dist/internal'

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

const isEnemy = (state: State, p: Position): boolean => {
  return state.game.turn === 'white'
    ? state.figures[p.y][p.x] === 'black' ||
        state.figures[p.y][p.x] === 'black-king'
    : state.figures[p.y][p.x] === 'white' ||
        state.figures[p.y][p.x] === 'white-king'
}

const promote = (state: State) => {
  return state.game.turn === 'white' ? 'white-king' : 'black-king'
}

const toggleTurn = (state: State) => {
  return state.game.turn === 'white' ? 'black' : 'white'
}

const markKills = (
  state: State,
  draft: WritableDraft<State>,
  position: Position,
  options: { limited?: boolean; directions?: DirectionFn[] } = {}
): boolean => {
  const { directions = [NE, NW, SE, SW], limited = true } = options
  return directions
    .map((direction) => {
      let p = { ...position }
      do {
        p = direction(p)
        if (!validate(p)) {
          return false
        }
        if (state.figures[p.y][p.x] !== 'none') {
          break
        }
      } while (!limited)

      let dp = direction(p)
      if (
        validate(dp) &&
        isEnemy(state, p) &&
        state.figures[dp.y][dp.x] === 'none'
      ) {
        draft.supports[p.y][p.x] = 'killable'
        draft.supports[dp.y][dp.x] = 'necessary'

        if (!limited) {
          while (true) {
            dp = direction(dp)
            if (!validate(dp)) {
              break
            }
            if (state.figures[dp.y][dp.x] !== 'none') {
              break
            }
            draft.supports[dp.y][dp.x] = 'necessary'
          }
        }

        return true
      }
      return false
    })
    .includes(true)
}

const markMoves = (
  state: State,
  draft: WritableDraft<State>,
  position: Position,
  options: { limited?: boolean; directions?: DirectionFn[] } = {}
): void => {
  const { directions = [NE, NW, SE, SW], limited = true } = options
  directions.forEach((direction) => {
    let p = { ...position }
    do {
      p = direction(p)
      if (!validate(p)) {
        break
      }
      if (state.figures[p.y][p.x] !== 'none') {
        break
      }
      draft.supports[p.y][p.x] = 'available'
    } while (!limited)
  })
}

const setSupportByPosition = (state: State, position: Position): State => {
  const { x, y } = position
  const figures = state.figures
  const turn = state.game.turn

  const isWhite = turn === 'white' && figures[y][x] === 'white'
  const isBlack = turn === 'black' && figures[y][x] === 'black'
  const isWhiteKing = turn === 'white' && figures[y][x] === 'white-king'
  const isBlackKing = turn === 'black' && figures[y][x] === 'black-king'

  return produce(state, (draft) => {
    draft.supports = initialSupports()

    if (isWhite) {
      draft.supports[y][x] = 'actual'
      draft.rightPosition = position
      !markKills(state, draft, position) &&
        markMoves(state, draft, position, { directions: [NE, NW] })
    }

    if (isBlack) {
      draft.supports[y][x] = 'actual'
      draft.rightPosition = position
      !markKills(state, draft, position) &&
        markMoves(state, draft, position, { directions: [SE, SW] })
    }

    if (isWhiteKing) {
      draft.supports[y][x] = 'actual'
      draft.rightPosition = position
      !markKills(state, draft, position, { limited: false }) &&
        markMoves(state, draft, position, { limited: false })
    }

    if (isBlackKing) {
      draft.supports[y][x] = 'actual'
      draft.rightPosition = position
      !markKills(state, draft, position, { limited: false }) &&
        markMoves(state, draft, position, { limited: false })
    }
  })
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'field-left-click': {
      const { x, y } = action.position
      const dp = state.rightPosition
      const support = state.supports[y][x]

      const isKill = !!dp && state.supports[y][x] === 'necessary'
      const isMove =
        !!dp && (support === 'available' || support === 'necessary')

      const newState = produce(state, (draft) => {
        draft.supports = initialSupports()

        if (isMove) {
          // move minion to new field
          draft.figures[y][x] =
            y === size - 1 || y === 0
              ? promote(state)
              : state.figures[dp.y][dp.x]
          draft.figures[dp.y][dp.x] = 'none'

          // kill enemy minion
          if (isKill) {
            const direction =
              dp.x > x ? (dp.y > y ? NW : SW) : dp.y > y ? NE : SE
            let p = { ...dp }
            while (true) {
              p = direction(p)
              if (!validate(p)) {
                break
              }
              if (isEnemy(state, p)) {
                draft.figures[p.y][p.x] = 'none'
                break
              }
            }
          } else {
            draft.game.turn = toggleTurn(state)
          }
        }
      })

      // refactor
      if (isKill && isMove) {
        const newestState = setSupportByPosition(newState, action.position)
        return newestState
      }
      return newState
    }

    case 'field-right-click': {
      return setSupportByPosition(state, action.position)
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
