import Card from '../components/Card'

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
      <div style={{display: "flex", alignItems: "center", flexDirection: "column", flexWrap: "nowrap", width: "auto"}}>
        <img src="src\assets\imgs\mk_logo.png" alt="Logo de MK" width={"40%"}/>
          {/* <h2>{Product.category}</h2> */}
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
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