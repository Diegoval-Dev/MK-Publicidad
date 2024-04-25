Feature: Pantalla Principal
    Como usuario
    Quiero acceder a la Pantalla Principal
    Para ver las categorías disponibles

Scenario: Verificar la pantalla principal
    Given que estoy en la página principal
    Then debería ver el componente para realizar búsquedas
    And debería ver las categorías
