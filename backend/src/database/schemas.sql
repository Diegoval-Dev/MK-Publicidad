CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);
CREATE TABLE Colores (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    nombre_color VARCHAR(50) NOT NULL
);
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    codigo_producto VARCHAR(20) NOT NULL UNIQUE,
    id_categoria INT NOT NULL,
    capacidad VARCHAR(50),
    tamaño VARCHAR(50),
    url_imagen VARCHAR(255),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);
CREATE TABLE Productos_Colores (
    id_producto_color INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_color INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_color) REFERENCES Colores(id_color)
);


create table users (
user_id int primary key auto_increment,
user_email VARCHAR(50) not null,
user_password VARCHAR(150) not null,
user_role VARCHAR(50) not null,
user_name VARCHAR(50) not null,
position VARCHAR(50) not null,
user_phone VARCHAR(50) not null,
user_officePhone VARCHAR(50) not null
);

CREATE TABLE quotes (
    quotation_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_nit INT NOT NULL,
    quote_no VARCHAR(50) NOT NULL,
    quote_date DATE NOT NULL,
    quote_sellerId INT NOT NULL,
    quote_validityTill DATE NOT NULL,
    quote_shippingTime VARCHAR(50) NOT NULL,
    quote_payMethod VARCHAR(50) NOT NULL,
    quote_credit BOOLEAN NOT NULL,
    quote_payForm VARCHAR(50) NOT NULL,
    productId INT NOT NULL,
    quote_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE Customers (
    Customer_ID INT PRIMARY KEY AUTO_INCREMENT,
    customer_company VARCHAR(50) NOT NULL,
    customer_email VARCHAR(50) NOT NULL,
    customer_contact VARCHAR(15) NOT NULL,
    customer_adress VARCHAR(255) NOT NULL
);



ALTER TABLE users
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
