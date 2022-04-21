import { MouseEvent } from 'react'

import ChessField from 'components/ChessField'
import { Fields, Figures, multipleRender } from 'logic/utils'

interface Props {
  rotated: boolean
  figures: Figures
  fields: Fields
  onFieldClick: (x: number, y: number, e: MouseEvent<HTMLDivElement>) => void
}

const ChessBoard = ({ rotated, figures, fields, onFieldClick }: Props) => {
  const handleFieldClick =
    (x: number, y: number) => (e: MouseEvent<HTMLDivElement>) => {
      onFieldClick(x, y, e)
    }

  return (
    <div className={`board ${rotated ? 'rotated' : ''}`}>
      {multipleRender((y) => (
        <div key={y} className='board-row'>
          {multipleRender((x) => (
            <ChessField
              key={x}
              figure={figures[y][x]}
              field={fields[y][x]}
              onClick={handleFieldClick(x, y)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
