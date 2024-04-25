Feature: Obtención de Productos por Categoría
  Como usuario
  Quiero buscar productos utilizando sus categorías
  Para encontrar fácilmente un producto específico

Scenario: Introducir la categoría del producto
        Given que estoy en la página del catálogo
        When ingreso la categoría del producto
        Then debería ver la lista de productos pertenecientes a esa categoría