import { MouseEvent } from 'react'
import classNames from 'classnames'

import ChessField from 'components/ChessField'
import { multipleRender } from 'logic/utils'
import { Fields, Figures, Position, Supports } from 'logic/types'

interface Props {
  turn: 'white' | 'black'
  rotated: boolean
  figures: Figures
  fields: Fields
  supports: Supports
  onFieldClick: (
    position: Position,
    event: MouseEvent<HTMLDivElement>,
    type: 'left' | 'right'
  ) => void
}

const ChessBoard = ({
  turn,
  rotated,
  figures,
  fields,
  supports,
  onFieldClick,
}: Props) => {
  const handleFieldClick =
    (position: Position, type: 'left' | 'right') =>
    (event: MouseEvent<HTMLDivElement>) => {
      onFieldClick(position, event, type)
    }

  return (
    <div
      className={classNames(
        'board',
        { 'board-rotated': rotated },
        { 'board-white-light': turn === 'white' },
        { 'board-black-light': turn === 'black' }
      )}
    >
      {multipleRender((y) => (
        <div key={y} className='board-row'>
          {multipleRender((x) => (
            <ChessField
              key={x}
              figure={figures[y][x]}
              field={fields[y][x]}
              support={supports[y][x]}
              onLeftClick={handleFieldClick({ x, y }, 'left')}
              onRightClick={handleFieldClick({ x, y }, 'right')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
