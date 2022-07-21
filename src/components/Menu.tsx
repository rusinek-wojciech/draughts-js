interface Props {
  playerVsPlayer: () => void
  playerVsAI: () => void
}

const Menu = ({ playerVsPlayer, playerVsAI }: Props) => {
  return (
    <div className='menu'>
      <div className='menu-message'>Choose game mode</div>
      <div className='menu-item' onClick={playerVsPlayer}>
        Player against player
      </div>
      <div className='menu-item' onClick={playerVsAI}>
        Player against AI
      </div>
      <div className='menu-message'></div>
    </div>
  )
}

export default Menu
