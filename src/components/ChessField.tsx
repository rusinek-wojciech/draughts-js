import { MouseEventHandler } from 'react'

import { Field, Figure, findFieldClass, findFigureClass } from 'logic/utils'

interface Props {
  figure: Figure
  field: Field
  onClick: MouseEventHandler<HTMLDivElement>
}

const ChessField = ({ figure, field, onClick }: Props) => {
  return (
    <div onClick={onClick} className={findFieldClass(field)}>
      <span className={findFigureClass(figure)} />
    </div>
  )
}

export default ChessField
