interface Props {
  title: string
  options?: { onClick: () => void; name: string }[]
}

const Menu = ({ title, options = [] }: Props) => {
  return (
    <div className='menu'>
      <div className='menu-message'>{title}</div>
      {options.map(({ name, onClick }, i) => (
        <div key={i} className='menu-item' onClick={onClick}>
          {name}
        </div>
      ))}
      <div className='menu-message'></div>
    </div>
  )
}

export default Menu
