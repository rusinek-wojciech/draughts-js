import { useReducer } from 'react'
import reducer from 'logic/reducer/reducer'
import { initialState } from 'logic/reducer/initial'
import ChessBoard from 'components/ChessBoard'
import Menu from 'components/Menu'
import { FieldClickFn, Status } from 'types'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { ActionType } from 'logic/reducer/action'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const handleRotate = () => {
    dispatch({ type: ActionType.ROTATE })
  }

  const handleChangeStatus = (status: Status) => () => {
    dispatch({ type: ActionType.SET_STATUS, status })
  }

  const handleFieldClick: FieldClickFn = (position, type) => (event) => {
    event.preventDefault()
    dispatch({ type, clickPosition: position })
  }

  const isMenuEnabled = state.status === Status.NONE

  return (
    <div className='app'>
      <Navbar />
      <main>
        <ChessBoard state={state} onFieldClick={handleFieldClick} />
        <p>Right click to choose figure, left click to move</p>
        <button onClick={handleRotate}>Rotate board</button>
      </main>
      {isMenuEnabled && (
        <Menu
          playerVsPlayer={handleChangeStatus(Status.PLAYER_VS_PLAYER)}
          playerVsAI={handleChangeStatus(Status.NONE)}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
