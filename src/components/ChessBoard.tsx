import clsx from 'clsx'
import { FieldClickFn, FieldStatus, State } from 'types'
import { iters, pos2str } from 'logic/utils'
import { ActionType } from 'logic/reducer/action'

interface Props {
  state: State
  onFieldClick: FieldClickFn
}

const ChessBoard = ({ state, onFieldClick }: Props) => {
  const { rightClickPosition, views, fields, isWhiteTurn, isBoardRotated } =
    state

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
            const { color, figure } = fields[position]

            if (rightClickPosition) {
              const { status, count } = views[rightClickPosition].view[position]
              return (
                <div
                  key={y}
                  onClick={onFieldClick(position, ActionType.FIELD_LEFT_CLICK)}
                  onContextMenu={onFieldClick(
                    position,
                    ActionType.FIELD_RIGHT_CLICK
                  )}
                  className={clsx('field', `field-${color}`, `view-${status}`)}
                >
                  <span className={clsx('figure', `figure-${figure}`)}>
                    {count}
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
                className={clsx(
                  'field',
                  `field-${color}`,
                  `view-${FieldStatus.NONE}`
                )}
              >
                <span className={clsx('figure', `figure-${figure}`)} />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
