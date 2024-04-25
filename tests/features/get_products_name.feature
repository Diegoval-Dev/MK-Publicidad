Feature: Obtención de Productos por Nombre
  Como usuario
  Quiero buscar productos utilizando sus nombres
  Para encontrar fácilmente un producto específico

Scenario: Introducir el nombre del producto
        Given que estoy en la página del catálogo
        When ingreso el nombre del producto
        Then debería ver la lista de productos con ese nombre