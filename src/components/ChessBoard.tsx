import { MouseEvent } from 'react'
import classNames from 'classnames'

import ChessField from 'components/ChessField'
import { multipleRender } from 'logic/utils'
import { Fields, Figures, Supports } from 'logic/types'

interface Props {
  rotated: boolean
  figures: Figures
  fields: Fields
  supports: Supports
  onFieldClick: (
    x: number,
    y: number,
    e: MouseEvent<HTMLDivElement>,
    type: 'left' | 'right'
  ) => void
}

const ChessBoard = ({
  rotated,
  figures,
  fields,
  supports,
  onFieldClick,
}: Props) => {
  const handleFieldClick =
    (x: number, y: number, type: 'left' | 'right') =>
    (e: MouseEvent<HTMLDivElement>) => {
      onFieldClick(x, y, e, type)
    }

  return (
    <div className={classNames('board', { 'board-rotated': rotated })}>
      {multipleRender((y) => (
        <div key={y} className='board-row'>
          {multipleRender((x) => (
            <ChessField
              key={x}
              figure={figures[y][x]}
              field={fields[y][x]}
              support={supports[y][x]}
              onLeftClick={handleFieldClick(x, y, 'left')}
              onRightClick={handleFieldClick(x, y, 'right')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
