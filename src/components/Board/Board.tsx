import React from 'react'
import './Board.css'
import { Piece } from '../Piece/Piece'
import { DATA, VIEW } from '../../config/enum'

interface Props {
  classes: string
  data: number[][]
  view: number[][]
  onClick: (i: number, j: number) => void
}

/**
 * Defines Board rendering
 */
export const Board: React.FC<Props> = (props) => {
  const { classes, data, view, onClick } = props

  const renderFigure = (item: number) => {
    if (item !== DATA.EMPTY) {
      return <Piece figure={item} />
    }
  }

  const renderItem = (item: number, i: number, j: number) => {
    const classes =
      'board-item' +
      ((j + i) % 2 === 0 ? ' board-item-white' : ' board-item-black') +
      ' board-' +
      Object.keys(VIEW)[view[i][j]].toLowerCase()
    return (
      <div className={classes} key={j} onClick={() => onClick(i, j)}>
        {renderFigure(item)}
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
