from locust import HttpUser, task, between
import random
import string

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

    def random_string(self, length=8):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    @task
    def register_user(self):
        # Generar un usuario con datos aleatorios
        user_data = {
            "user_email": f"{self.random_string(5)}@example.com",
            "user_password": "Password123!",
            "user_role": "admin",
            "user_name": "John Doe",
            "position": "Manager",
            "user_phone": "1234567890",
            "user_officePhone": "0987654321"
        }
        
        # Hacer la solicitud POST al endpoint /api/admin/register
        with self.client.post("/admin/register", json=user_data, catch_response=True) as response:
            if response.status_code == 201:
                response.success()  # Si la solicitud es exitosa (201)
                print(f"Usuario registrado: {user_data['user_email']}")
            else:
                response.failure(f"Error al registrar usuario: {response.text}")  # Si falla

    def on_start(self):
        """Método que se ejecuta cuando comienza la prueba."""
        print("Iniciando pruebas de registro en el endpoint /api/admin/register.")
