create table productos (
    id int primary key auto_increment,
    name varchar(100) not null,
    category varchar(50) not null,
    material varchar(50),
    description text,
    image varchar(255),
    deletedAt timestamp null
);

ALTER TABLE productos ADD COLUMN size VARCHAR(50);
ALTER TABLE productos ADD COLUMN color VARCHAR(50);
ALTER TABLE productos ADD COLUMN technique VARCHAR(50);
ALTER TABLE productos MODIFY COLUMN image VARCHAR(255);



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
