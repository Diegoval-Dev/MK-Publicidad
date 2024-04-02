
import { useState } from 'react'
import '../styles/App.css'
import Catalogue from '../views/Catalogue'
import Home from '../views/Home'


function App() {
  const [screen, setScreen] = useState("home")
  switch (screen) {
    case "home":
    return Home(setScreen)

    case "catalog":
      return Catalogue(setScreen)
  }
}

export default App