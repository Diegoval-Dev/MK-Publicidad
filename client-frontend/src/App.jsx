import { useState } from 'react'
import './styles/App.css'
import Home from './views/Home'
import CatalogPage from './views/Catalogue'

function App() {
  const [screen, setScreen] = useState("home")

  return (
    <>
      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "catalog" && <CatalogPage setScreen={setScreen} />}
    </>
  );
}


export default App