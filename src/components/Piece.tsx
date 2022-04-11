import { DATA } from 'config/enum'

interface Props {
  figure: number
}

const Piece = ({ figure }: Props) => {
  return (
    <span
      className={'figure figure-' + Object.keys(DATA)[figure].toLowerCase()}
    />
  )
}

export default Piece
