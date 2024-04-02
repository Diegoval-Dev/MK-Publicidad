create table productos (
    id int primary key auto_increment,
    name varchar(100) not null,
    category varchar(50) not null,
    material varchar(50),
    description text,
    image blob,
    deletedAt timestamp null
);

ALTER TABLE productos MODIFY COLUMN image LONGBLOB;