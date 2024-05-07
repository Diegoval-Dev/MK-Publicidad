import { NavigationProvider } from '@hooks/useNavigate'
import Router from '@router/Router'


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
