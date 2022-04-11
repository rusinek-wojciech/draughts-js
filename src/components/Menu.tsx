interface Props {
  isWinner: boolean
  msg: string
  onAgainstPlayer: () => void
  onAgaistAI: () => void
}

const Menu = ({ isWinner, msg, onAgainstPlayer, onAgaistAI }: Props) => {
  return (
    <div className="menu" style={{ display: isWinner ? 'block' : 'none' }}>
      <div className="menu-message">{msg}</div>
      <div className="menu-item" onClick={onAgainstPlayer}>
        Player against player
      </div>
      <div className="menu-item" onClick={onAgaistAI}>
        Player against AI
      </div>
    </div>
  )
}

export default Menu
