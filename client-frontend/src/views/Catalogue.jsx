import Card from '../components/Card'
import '../styles/styles.css'

function Catalogue() {

  // Objeto de Prueba
  const Product = [
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
  ]
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <img src="src\assets\imgs\mk_logo.png" alt="Logo de MK" width={"40%"}/>
          <h2 className='titleAdmin' style={{alignSelf: "flex-start", fontSize: "25px", margin: "2%"}}>{Product[0].category}</h2>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", }}>
          {Product.map((product, index) => {
            return (
              <div key={index} style={{margin: "1%"}}>
                {Card(product)}
              </div>  
                )
              })}
          </div>
      </div>
    )
}

export default Catalogue;