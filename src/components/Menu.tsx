interface Props {
  enabled: boolean
  message: string
  playerVsPlayer: () => void
  playerVsAi: () => void
}

const Menu = ({ enabled, message, playerVsPlayer, playerVsAi }: Props) => {
  return (
    <div className='menu' style={{ display: enabled ? 'block' : 'none' }}>
      <div className='menu-message'>{message}</div>
      <div className='menu-item' onClick={playerVsPlayer}>
        Player against player
      </div>
      <div className='menu-item' onClick={playerVsAi}>
        Player against AI
      </div>
    </div>
  )
}

export default Menu
