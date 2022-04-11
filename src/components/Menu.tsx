interface Props {
  isWinner: boolean
  msg: string
  onClick: {
    againstPlayer: () => void
    againstAI: () => void
  }
}

/**
 * Floating menu
 */
export const Menu: React.FC<Props> = (props) => {
  const { isWinner, msg, onClick } = props
  return (
    <div className="menu" style={{ display: isWinner ? 'block' : 'none' }}>
      <div className="menu-message">{msg}</div>
      <div className="menu-item" onClick={() => onClick.againstPlayer()}>
        Play against player
      </div>
      <div className="menu-item" onClick={() => onClick.againstAI()}>
        Play against AI
      </div>
    </div>
  )
}
