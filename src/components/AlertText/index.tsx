import { useFirebaseUser } from '../../context'
import "./style.css"

function ShowAlertText() {
    const {alertText} = useFirebaseUser()
  return (
    <div id='ShowAlertText'>
        <p>{alertText}</p>
    </div>
  )
}

export default ShowAlertText