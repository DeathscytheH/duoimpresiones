DROP DATABASE if exists duoimpresiones;
CREATE DATABASE IF NOT EXISTS duoimpresiones;

USE duoimpresiones;

drop user 'duo_admin'@'localhost';
flush privileges;
CREATE USER 'duo_admin'@'localhost' IDENTIFIED BY 'holamundo123.';
grant all privileges on duoimpresiones.* to 'duo_admin'@'localhost' identified by 'holamundo123.';

create table if not exists tipoUsuario(
  tid smallint unsigned AUTO_INCREMENT NOT NULL,
  descripcion varchar(200) not null,
  primary key(tid)
)charset=utf8;

create table usuarios(
	uid smallint unsigned AUTO_INCREMENT NOT NULL,
    nombre varchar(50) not null,
	apellido_paterno varchar(50) not null,
    apellido_materno varchar(50) not null,
	user varchar(16) not null,
    pass varchar(200) not null,
    email varchar(50) not null unique,
    tid smallint unsigned not null,
    primary key(uid),
    foreign key(tid) references tipoUsuario(tid)
)charset=utf8;

insert into tipoUsuario (descripcion) values
("Balin"),
("Chafa"),
("Me lleva"),
("Donald Trump");

insert into usuarios (nombre, apellido_paterno, apellido_materno, user, pass, email, tid) values
("hola", "que", "hace", "hola", "mundo", "hola@mundo.com", 1),
("ola", "ke", "ase", "ola", "mundo", "ola@mundo.com", 2),
("ola", "que", "ace", "tony", "mundo", "tony@mundo.com", 3),
("Bruno", "Diaz", "Perez", "batman", "alfred", "batman@mundo.com", 4);
