import clsx from 'clsx'
import { Color, FieldClickFn, State } from 'types'
import { iters, pos2str } from 'logic/utils'
import { ActionType } from 'logic/reducer/action'

const colorByField = (x: number, y: number): string => {
  return x > y ? `field-${Color.BLACK}` : `field-${Color.WHITE}`
}

interface Props {
  state: State
  onFieldClick: FieldClickFn
}

const ChessBoard = ({ state, onFieldClick }: Props) => {
  const { rightClickPosition, board, isWhiteTurn, isBoardRotated } = state

  return (
    <div
      className={clsx(
        'board',
        { 'board-rotated': isBoardRotated },
        { 'board-white-light': isWhiteTurn },
        { 'board-black-light': !isWhiteTurn }
      )}
    >
      {iters.map((x) => (
        <div key={x} className='board-row'>
          {iters.map((y) => {
            const position = pos2str([x, y])

            if (rightClickPosition) {
              const fieldView = board.view(rightClickPosition)!.field(position)

              return (
                <div
                  key={y}
                  onClick={onFieldClick(position, ActionType.FIELD_LEFT_CLICK)}
                  onContextMenu={onFieldClick(
                    position,
                    ActionType.FIELD_RIGHT_CLICK
                  )}
                  className={clsx(
                    'field',
                    colorByField(x, y),
                    `view-${fieldView.status}`
                  )}
                >
                  <span className={clsx('figure', board.figureStyle(position))}>
                    {fieldView.count}
                  </span>
                </div>
              )
            }

            return (
              <div
                key={y}
                onClick={onFieldClick(position, ActionType.FIELD_LEFT_CLICK)}
                onContextMenu={onFieldClick(
                  position,
                  ActionType.FIELD_RIGHT_CLICK
                )}
                className={clsx('field', colorByField(x, y))}
              >
                <span
                  className={clsx('figure', board.figureStyle(position))}
                ></span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
