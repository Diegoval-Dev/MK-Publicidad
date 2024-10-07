FROM node:21.6.2

WORKDIR /backend

# Copia el package.json e instala las dependencias
COPY package.json package-lock.json ./
RUN npm install -g nodemon   # Instala nodemon globalmente
RUN npm install

# Copia todo el código a la carpeta de trabajo
COPY . .

# Establece el entrypoint a nodemon para vigilar cambios
ENTRYPOINT ["nodemon", "--watch", ".", "--ext", "js,json", "--exec", "node", "app.js"]
