create table productos (
    id int primary key auto_increment,
    name varchar(100) not null,
    category varchar(50) not null,
    material varchar(50),
    description text,
    image blob,
    deletedAt timestamp null
);

create table users (
user_email VARCHAR(50) not null,
user_password VARCHAR(150) not null,
user_role VARCHAR(50) not null,
user_name VARCHAR(50) not null,
position VARCHAR(50) not null,
user_phone VARCHAR(50) not null,
user_officePhone VARCHAR(50) not null
);


ALTER TABLE productos MODIFY COLUMN image LONGBLOB;