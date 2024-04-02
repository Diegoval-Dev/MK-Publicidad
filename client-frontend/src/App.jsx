import { useState } from 'react'
//import Product from '../../backend/src/models/productModel'
import './App.css'
import { Cards, VerifyCards, Banner, BannerSearch, Buttons, ButtonsLogIn, Background } from './styles/styled'

function App() {
  const [screen, setScreen] = useState("home")
  switch (screen) {
    case "home":
    return homePage(setScreen)

    case "catalog":
      return catalogPage(setScreen)
  }
}

function homePage(setScreen) {

  // Objeto de Prueba
  const Product = [
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://printto.com.gt/wp-content/uploads/2022/06/impresion-digital-lona-manta-vinilica-vinilo-adhesivo-guatemala.jpg",
      "category": "Mantas"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/03/Taza-Asa-Bicolor-Celeste.jpg",
      "category": "Tazas Personalizadas"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/03/Pachon-Blanco-Tapon-Negro.jpg",
      "category": "Pachones Personalizados"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://printto.com.gt/wp-content/uploads/2022/06/impresion-digital-lona-manta-vinilica-vinilo-adhesivo-guatemala.jpg",
      "category": "Mantas"
    },
  ]

  const categories = Array.from(new Set(Product.map(product => product.category)))

  const goToCatalog = () => {
    setScreen("catalog")
  }

  return(
    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <img src="src\assets\imgs\mk_logo.png" alt="Logo de MK" width={"40%"}/>
      <BannerSearch></BannerSearch>
      <Background>
        {categories.map((category, index) => {
          const productImage = Product.find(product => product.category === category)
          return(
            <Cards key={index} onClick={goToCatalog}>
                <img src={productImage.image} alt="Imagen de Categoría" width={"70%"}/>
                <p>{category}</p>
            </Cards>
          )
        })}
      </Background>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "nowrap", width: "10%", alignSelf: "flex-start"}}>
        <a href="https://m.facebook.com/people/MK-Publicidad-SA/100063825709539/" target='_blank'>
          <img src="src\assets\imgs\facebook_icon.png" alt="Página de Facebook"/>
        </a>
        <a href="" target='_blank'>
          <img src="src\assets\imgs\instagram_icon.png" alt="Página de Instagram" />
        </a>
      </div>
    </div>
  )
}

function catalogPage() {

  // Objeto de Prueba

}

function productPage() {
  
}

export default App