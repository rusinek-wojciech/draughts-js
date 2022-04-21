interface Props {
  playerVsPlayer: () => void
  playerVsAi: () => void
}

const Menu = ({ playerVsPlayer, playerVsAi }: Props) => {
  return (
    <div className='menu'>
      <div className='menu-message'>Choose game mode</div>
      <div className='menu-item' onClick={playerVsPlayer}>
        Player against Player
      </div>
      <div className='menu-item' onClick={playerVsAi}>
        Player against AI
      </div>
    </div>
  )
}

export default Menu
