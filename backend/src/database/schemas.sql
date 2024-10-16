-- Creación de la tabla Categories
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Creación de la tabla Colors
CREATE TABLE Colors (
    color_id INT AUTO_INCREMENT PRIMARY KEY,
    color_name VARCHAR(50) NOT NULL,
    hex_code VARCHAR(7) NOT NULL
);

-- Creación de la tabla Products
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_code VARCHAR(20) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    capacity VARCHAR(50),
    size VARCHAR(50),
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Creación de la tabla Product_Colors
CREATE TABLE Product_Colors (
    product_color_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    color_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (color_id) REFERENCES Colors(color_id)
);

-- Inserción de datos en la tabla Categories
INSERT INTO Categories (category_name) VALUES
('Cerámica'),
('Peltre'),
('Acero Inoxidable'),
('Aluminio'),
('Vidrio'),
('Textiles'),
('Madera'),
('Bolsas y Mochilas'),
('Varios'),
('Protección'),
('Murales y Vinil'),
('Sandblast'),
('Letras recortadas, placas, acrílico y PVC'),
('Display');

-- Inserción de datos en la tabla Colors
INSERT INTO Colors (color_name, hex_code) VALUES
('White', '#FFFFFF'),
('Black', '#000000'),
('Red', '#FF0000'),
('Blue', '#0000FF'),
('Gray', '#808080'),
('Green', '#008000'),
('Yellow', '#FFFF00'),
('Pink', '#FFC0CB'),
('Transparent', '#FFFFFF'),
('Silver', '#C0C0C0'),
('Beige', '#F5F5DC'),
('Multicolor', '#FFD700');

-- Inserción de datos en la tabla Products
INSERT INTO Products (product_name, product_code, category_id, capacity, size, image_url) VALUES
('White Mug', 'T-0001', 1, '11 oz', '', 'https://res.cloudinary.com/dw1cyckty/image/upload/v1723236003/img53_cvy7ki.jpg'),
('Mug with Interior', 'T-0002', 1, '11 oz', '', 'https://res.cloudinary.com/dw1cyckty/image/upload/v1723236003/img54_xgk6bi.jpg');

-- Inserción de datos en la tabla Product_Colors (verifica que existan los productos y colores)
INSERT INTO Product_Colors (product_id, color_id) VALUES
(1, 1),
(2, 1);

-- Creación de la tabla Users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(150) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    user_office_phone VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creación de la tabla Quotes
CREATE TABLE Quotes (
    quotation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_nit INT NOT NULL,
    quote_no VARCHAR(50) NOT NULL,
    quote_date DATE NOT NULL,
    quote_seller_id INT NOT NULL,
    quote_validity_till DATE NOT NULL,
    quote_shipping_time VARCHAR(50) NOT NULL,
    quote_pay_method VARCHAR(50) NOT NULL,
    quote_credit BOOLEAN NOT NULL,
    quote_pay_form VARCHAR(50) NOT NULL,
    product_id INT NOT NULL,
    quote_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Creación de la tabla Customers
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_company VARCHAR(50) NOT NULL,
    customer_email VARCHAR(50) NOT NULL,
    customer_contact VARCHAR(15) NOT NULL,
    customer_address VARCHAR(255) NOT NULL
);
