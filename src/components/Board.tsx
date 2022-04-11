import Piece from 'components/Piece'
import { DATA, VIEW } from 'config/enum'

interface Props {
  classes: string
  data: number[][]
  view: number[][]
  onClick: (i: number, j: number) => void
}

const Board = ({ classes, data, view, onClick }: Props) => {
  const renderItem = (item: number, i: number, j: number) => {
    const classes =
      'board-item' +
      ((j + i) % 2 === 0 ? ' board-item-white' : ' board-item-black') +
      ' board-' +
      Object.keys(VIEW)[view[i][j]].toLowerCase()
    const notEmpty = item !== DATA.EMPTY
    return (
      <div className={classes} key={j} onClick={() => onClick(i, j)}>
        {notEmpty && <Piece figure={item} />}
      </div>
    )
  }

  const renderRow = (row: number[], i: number) => {
    return (
      <div className="board-row" key={i}>
        {row.map((item: number, j: number) => renderItem(item, i, j))}
      </div>
    )
  }

  return (
    <div className={'board ' + classes}>
      {data.map((row: number[], i: number) => renderRow(row, i))}
    </div>
  )
}

export default Board
