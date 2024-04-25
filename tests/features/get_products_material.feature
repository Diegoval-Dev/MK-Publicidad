Feature: Obtención de Productos por Material
  Como usuario
  Quiero buscar productos utilizando sus materiales
  Para encontrar fácilmente productos fabricados con el mismo material

Scenario: Introducir el material del producto
        Given que estoy en la página del catálogo
        When ingreso el material del producto
        Then debería ver la lista de productos fabricados con ese material