import clsx from 'clsx'
import { Color, FieldClickFn, FieldStatus, State } from 'types'
import { iters, pos2str } from 'logic/utils'

interface Props {
  state: State
  onFieldClick: FieldClickFn
}

const ChessBoard = ({ state, onFieldClick }: Props) => {
  const currentViews = state.rightClickPosition
    ? state.views[state.rightClickPosition].view
    : null

  return (
    <div
      className={clsx(
        'board',
        { 'board-rotated': state.isBoardRotated },
        { 'board-white-light': state.turn === Color.WHITE },
        { 'board-black-light': state.turn === Color.BLACK }
      )}
    >
      {iters.map((x) => (
        <div key={x} className='board-row'>
          {iters.map((y) => {
            const strPosition = pos2str([x, y])
            const { color, figure } = state.fields[strPosition]

            if (currentViews) {
              const { status, count } = currentViews[strPosition]
              return (
                <div
                  key={y}
                  onClick={onFieldClick(strPosition, 'left')}
                  onContextMenu={onFieldClick(strPosition, 'right')}
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
                onClick={onFieldClick(strPosition, 'left')}
                onContextMenu={onFieldClick(strPosition, 'right')}
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
