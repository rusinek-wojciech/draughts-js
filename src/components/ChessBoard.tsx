import clsx from 'clsx'
import { Color, FieldClickFn, FieldStatus, State } from 'types'
import { iters, pos2str } from 'logic/utils'

interface Props {
  state: State
  onFieldClick: FieldClickFn
}

const ChessBoard = ({ state, onFieldClick }: Props) => {
  const { rightClickPosition, views, fields } = state

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
            const position = pos2str([x, y])
            const { color, figure } = fields[position]

            if (rightClickPosition) {
              const { status, count } = views[rightClickPosition].view[position]
              return (
                <div
                  key={y}
                  onClick={onFieldClick(position, 'left')}
                  onContextMenu={onFieldClick(position, 'right')}
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
                onClick={onFieldClick(position, 'left')}
                onContextMenu={onFieldClick(position, 'right')}
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
