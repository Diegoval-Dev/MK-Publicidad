from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def search_categories(self):
        # Definimos el parámetro que vamos a enviar en la búsqueda
        params = {
            "keyword": "1"
        }
        
        # Hacemos una petición GET al endpoint de búsqueda con el parámetro 'keyword'
        response = self.client.get("/user/search/categories", params=params)
        
        # Verificamos si la respuesta es exitosa
        if response.status_code == 200:
            print("Búsqueda de categorías exitosa")
        else:
            print(f"Error en la búsqueda de categorías: {response.status_code}")

        # Puedes imprimir el contenido de la respuesta para verificar
        print(response.text)

    @task
    def get_products(self):
        # Hacemos una petición GET al endpoint de productos
        response = self.client.get("/user/products")
        
        # Verificamos si la respuesta es exitosa
        if response.status_code == 200:
            print("Obtención de productos exitosa")
        else:
            print(f"Error al obtener productos: {response.status_code}")
        
        # Imprimimos la respuesta para verificar los datos obtenidos
        print(response.text)