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
} from 'logic/utils'

export const generateView = (
  fields: Fields,
  position: Position,
  color: Color
): View => {
  const view = initialView()
  const oColor = oppositeColor(color)

  const positionStr = pos2str(position)
  view[positionStr].status = FieldStatus.ACTUAL

  const rightPosition = movements.right(position, color)
  const leftPosition = movements.left(position, color)

  if (leftPosition) {
    const leftPositionStr = pos2str(leftPosition)

    if (fields[leftPositionStr].figure === Figure.NONE) {
      view[leftPositionStr].status = FieldStatus.AVAILABLE
    } else if (isFieldFigureGivenColor(fields, leftPositionStr, oColor)) {
      const dp = movements.left(leftPosition, color)

      if (dp) {
        const dpStr = pos2str(dp)
        if (fields[dpStr].figure === Figure.NONE) {
          view[leftPositionStr].status = FieldStatus.KILLABLE
          view[dpStr].status = FieldStatus.NECESSARY
        }
      }
    }
  }

  if (rightPosition) {
    const rightPositionStr = pos2str(rightPosition)

    if (fields[rightPositionStr].figure === Figure.NONE) {
      view[rightPositionStr].status = FieldStatus.AVAILABLE
    } else if (isFieldFigureGivenColor(fields, rightPositionStr, oColor)) {
      const dp = movements.right(rightPosition, color)

      if (dp) {
        const dpStr = pos2str(dp)
        if (fields[dpStr].figure === Figure.NONE) {
          view[rightPositionStr].status = FieldStatus.KILLABLE
          view[dpStr].status = FieldStatus.NECESSARY
        }
      }
    }
  }

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
