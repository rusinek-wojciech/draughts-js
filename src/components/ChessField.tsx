import { MouseEventHandler } from 'react'
import clsx from 'clsx'

import { Field, Figure, Support } from 'logic/types'

interface Props {
  figure: Figure
  field: Field
  support: Support
  onLeftClick: MouseEventHandler<HTMLDivElement>
  onRightClick: MouseEventHandler<HTMLDivElement>
}

const ChessField = ({
  figure,
  field,
  support,
  onLeftClick,
  onRightClick,
}: Props) => {
  return (
    <div
      onClick={onLeftClick}
      onContextMenu={onRightClick}
      className={clsx('field', `field-${field}`, `support-${support}`)}
    >
      <span className={clsx('figure', `figure-${figure}`)} />
    </div>
  )
}

export default ChessField
