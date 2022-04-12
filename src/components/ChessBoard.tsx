import { MouseEvent } from 'react'

import ChessField from 'components/ChessField'
import { Board, multipleRender } from 'logic/utils'

interface Props {
  board: Board
  onFieldClick: (x: number, y: number, e: MouseEvent<HTMLDivElement>) => void
}

const ChessBoard = ({ board, onFieldClick }: Props) => {
  const handleFieldClick =
    (x: number, y: number) => (e: MouseEvent<HTMLDivElement>) => {
      onFieldClick(x, y, e)
    }

  return (
    <div className='board'>
      {multipleRender((y) => (
        <div key={y} className='board-row'>
          {multipleRender((x) => (
            <ChessField
              key={x}
              field={board.field(x, y)}
              onClick={handleFieldClick(x, y)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ChessBoard
