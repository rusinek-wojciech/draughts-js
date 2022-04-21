import { MouseEventHandler } from 'react'
import classNames from 'classnames'

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
      className={classNames('field', `field-${field}`, `support-${support}`)}
    >
      <span className={classNames('figure', `figure-${figure}`)} />
    </div>
  )
}

export default ChessField
