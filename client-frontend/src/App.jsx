import './styles/App.css'
import { NavigationProvider } from '@hooks/useNavigate'
import Router from '@router/index'

function App() {


  return (
    <>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </>
  )
}


export default App