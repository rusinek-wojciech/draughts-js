import { emptyInitialView, initialView } from 'logic/reducer/initial'
import {
  FieldStatus,
  Position,
  Figure,
  Color,
  Fields,
  View,
  Views,
} from 'types'
import {
  isFieldFigureGivenColor,
  iters2D,
  movements,
  pos2str,
  oppositeColor,
  isKing,
} from 'logic/utils'

const markAvailable = (
  fields: Fields,
  position: Position,
  view: View,
  color: Color,
  king: boolean
) => {
  if (king) {
    movements.each().forEach((fn) => {
      let p: Position = [position[0], position[1]]
      while (true) {
        const dp = fn(p)

        if (!dp) {
          return
        }

        const dpStr = pos2str(dp)

        if (fields[dpStr].figure !== Figure.NONE) {
          return
        }

        if (view[dpStr].status !== FieldStatus.NONE) {
          return
        }

        view[dpStr].status = FieldStatus.AVAILABLE
        p = dp
      }
    })
  } else {
    movements.eachByColor(color).forEach((fn) => {
      const dp = fn(position)

      if (!dp) {
        return
      }

      const dpStr = pos2str(dp)

      if (fields[dpStr].figure !== Figure.NONE) {
        return
      }

      if (view[dpStr].status !== FieldStatus.NONE) {
        return
      }

      view[dpStr].status = FieldStatus.AVAILABLE
    })
  }
}

export const generateView = (
  fields: Fields,
  position: Position,
  color: Color
): [View, number] => {
  const positionStr = pos2str(position)
  const king = isKing(fields[positionStr].figure)
  const oppColor = oppositeColor(color)
  const view = initialView()

  view[positionStr].status = FieldStatus.ACTUAL

  let kills = 0
  let isKill = false
  const markKillable = (position: Position, count: number = 0) => {
    movements.each().forEach((fn) => {
      let p: Position = [position[0], position[1]]
      while (true) {
        const dp = fn(p)

        if (!dp) {
          return
        }

        const dpStr = pos2str(dp)

        if (!isFieldFigureGivenColor(fields, dpStr, oppColor)) {
          if (king) {
            p = dp
            continue
          }
          return
        }

        const ddp = fn(dp)

        if (!ddp) {
          return
        }

        const ddpStr = pos2str(ddp)

        if (fields[ddpStr].figure !== Figure.NONE) {
          return
        }

        if (view[dpStr].status !== FieldStatus.NONE) {
          return
        }

        view[dpStr].status = FieldStatus.KILLABLE
        view[ddpStr].status =
          count === 0 ? FieldStatus.NECESSARY : FieldStatus.NECESSARY_NEXT
        view[ddpStr].count = count + 1
        kills++
        isKill = true
        markKillable(ddp, count + 1)
        break
      }
    })
  }

  markKillable(position)

  if (isKill) {
    return [view, kills]
  }

  markAvailable(fields, position, view, color, king)

  return [view, kills]
}

export const generateViews = (fields: Fields, color: Color): Views => {
  return iters2D
    .map((position) => {
      if (isFieldFigureGivenColor(fields, pos2str(position), color)) {
        const [view, kills] = generateView(fields, position, color)
        return {
          [pos2str(position)]: {
            view,
            kills,
          },
        }
      }
      return {
        [pos2str(position)]: {
          view: emptyInitialView,
          kills: 0,
        },
      }
    })
    .reduce(
      (obj, acc) => ({
        ...acc,
        ...obj,
      }),
      {}
    )
}
