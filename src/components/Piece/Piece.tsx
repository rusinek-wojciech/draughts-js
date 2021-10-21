import './Piece.css'
import { DATA } from '../../config/enum'

/**
 * Represents game piece
 */
export const Piece = (props: any) => {
  const { figure } = props
  return (
    <span
      className={'figure figure-' + Object.keys(DATA)[figure].toLowerCase()}
    />
  )
}
