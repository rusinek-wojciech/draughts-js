import { MouseEventHandler } from 'react'

import { Field } from 'logic/utils'

interface Props {
  field: Field
  onClick: MouseEventHandler<HTMLDivElement>
}

const ChessField = ({ field, onClick }: Props) => {
  const { figureClass, fieldClass } = field
  return (
    <div onClick={onClick} className={fieldClass}>
      <span className={figureClass} />
    </div>
  )
}

export default ChessField
