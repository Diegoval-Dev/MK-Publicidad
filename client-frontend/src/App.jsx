import { useState } from 'react'
import './styles/App.css'
import Home from './views/Home'
import CatalogPage from './views/Catalogue'
import CustomizationPage from './views/CustomizationPage'

function App() {
  const [screen, setScreen] = useState({name: "home", product: null})

  const changeScreen = (screen) => {
    setScreen(screen)
  }

  return (
    <>
      {screen.name === "home" && <Home setScreen={changeScreen} />}
      {screen.name === "catalog" && <CatalogPage setScreen={changeScreen} />}
      {screen.name === "customization" && <CustomizationPage product={screen.product} />}
    </>
  )
}


export default App