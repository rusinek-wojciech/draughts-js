import { initialView } from 'logic/reducer/initial'
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
): View => {
  const positionStr = pos2str(position)
  const king = isKing(fields[positionStr].figure)
  const oppColor = oppositeColor(color)
  const view = initialView()

  view[positionStr].status = FieldStatus.ACTUAL

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

        isKill = true
        markKillable(ddp, count + 1)
        break
      }
    })
  }

  markKillable(position)

  if (isKill) {
    return view
  }

  markAvailable(fields, position, view, color, king)

  return view
}

export const generateViews = (fields: Fields, color: Color): Views => {
  return iters2D
    .filter((position) =>
      isFieldFigureGivenColor(fields, pos2str(position), color)
    )
    .map((position, i) => ({
      [pos2str(position)]: {
        position: iters2D[i],
        view: generateView(fields, position, color),
      },
    }))
    .reduce(
      (obj, acc) => ({
        ...acc,
        ...obj,
      }),
      {}
    )
}
