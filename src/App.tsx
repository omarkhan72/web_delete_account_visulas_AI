import './App.css'
import { Loader, TermsAndPolicy } from './components'
import { FirebaseUserProvider, useFirebaseUser } from './context/firebaseAuth'
import { LoginPage, ManageAccountPage } from './pages'

function App() {
  return (
    <div className='app-container'>
      <FirebaseUserProvider>
        <ConditionalRender />
      </FirebaseUserProvider>
    </div>
  )
}

function ConditionalRender() {
  const { isLogin, loading, } = useFirebaseUser()
  return (<>
    {!isLogin ? <LoginPage /> : <ManageAccountPage />}
    {loading && <Loader /> }
    <TermsAndPolicy />
  </>
  )
}

export default App
