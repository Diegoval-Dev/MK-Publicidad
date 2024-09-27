from locust import HttpUser, task, between

class AdminUser(HttpUser):
    wait_time = between(1, 3)  # Tiempo de espera entre las solicitudes, en segundos

    # Prueba para el endpoint POST /api/admin/register
    @task(1)
    def register_user(self):
        payload = {
            "user_email": "newuser@example.com",
            "user_password": "Password123!",
            "user_role": "admin",
            "user_name": "John Doe",
            "position": "Manager",
            "user_phone": "1234567890",
            "user_officePhone": "0987654321"
        }
        self.client.post("/api/admin/register", json=payload)

    # Prueba para el endpoint POST /api/admin/login
    @task(2)  # Mayor peso porque se espera más actividad en login
    def login_user(self):
        payload = {
            "user_email": "newuser@example.com",
            "user_password": "Password123!"
        }
        self.client.post("/api/admin/login", json=payload)

 # Prueba para el endpoint GET /api/products/categories/search
    @task(3)
    def search_by_keyword(self):
        keyword = "camisetas"  # Cambia la palabra clave según sea necesario
        self.client.get(f"/api/products/categories/search?keyword={keyword}")
