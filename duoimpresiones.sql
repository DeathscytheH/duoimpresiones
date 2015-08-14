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
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    nombre varchar(50) not null,
	apellido_paterno varchar(50) not null,
    apellido_materno varchar(50) not null,
	user varchar(16) not null,
    pass varchar(200) not null,
    email varchar(50) not null,
    tid smallint unsigned not null,
    primary key(id),
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


create table vinil_corte(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tamano smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into vinil_corte (descripcion, tamano, precio, precioMaq) values
("Vinil corte 1-10m",10, 150, 130),
("Vinil corte +10m ",11, 130, 100);

create table fotobotones(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tamano smallint unsigned not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into fotobotones (descripcion, tamano, piezas, precio, precioMaq) values
("Fotoboton 5cm 20pz",5, 20, 6, 4.5),
("Fotoboton 5cm 30pz",5, 40, 5, 4),
("Fotoboton 7cm 20pz",7, 20, 8, 6.5),
("Fotoboton 7cm 30pz",7, 40, 7, 5.5);

create table tabloide_color(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tipo char(50) not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into tabloide_color (descripcion, tipo, piezas, precio, precioMaq) values
("Tabloide color 1-50pz", "couche 130", 50, 8, 6.5),
("Tabloide color 1-50pz", "bond", 50, 8, 6.5),
("Tabloide color 1-50pz", "papel opalina", 50, 8, 6.5),
("Tabloide color +51pz", "couche 130", 51, 7, 6),
("Tabloide color +51pz", "bond", 51, 7, 6),
("Tabloide color +51pz", "papel opalina", 51, 7, 6),
("Tabloide color 1-50pz", "couche 300", 50, 9, 7),
("Tabloide color 1-50pz", "couche 200", 50, 9, 7),
("Tabloide color 1-50pz", "sulfatado", 50, 9, 7),
("Tabloide color +51pz", "couche 300", 51, 8, 6.5),
("Tabloide color +51pz", "couche 200", 51, 8, 6.5),
("Tabloide color +51pz", "sulfatado", 51, 8, 6.5),
("Tabloide color 1-50pz", "adhesivo", 50, 10, 8),
("Tabloide color 1-50pz", "cartulina opalina", 50, 10, 8),
("Tabloide color 1-50pz", "eurokote", 50, 10, 8),
("Tabloide color +51pz", "adhesivo", 51, 8.5, 7.5),
("Tabloide color +51pz", "cartulina opalina", 51, 8.5, 7.5),
("Tabloide color +51pz", "eurokote", 51, 8.5, 7.5);

create table gran_formato(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tipo char(50) not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into gran_formato (descripcion, tipo, piezas, precio, precioMaq) values
("Gran formato 1-10m2" ,"lona 1 año", 10, 80, 55),
("Gran formato 1-10m2","vinil", 10, 120, 80),
("Gran formato 1-10m2","microperforado", 10, 180, 160),
("Gran formato 1-10m2","lona traslucida 1 año", 10, 110, 80),
("Gran formato 1-10m2","vinil electro", 10, 170, 150),
("Gran formato +10m2","lona 1 año", 11, 70, 50),
("Gran formato +10m2","vinil", 11, 110, 75),
("Gran formato +10m2","microperforado", 11, 160, 145),
("Gran formato +10m2","lona traslucida 1 año", 11, 100, 80),
("Gran formato +10m2","vinil electro", 11, 160, 160);

create table tarjetas_presentacion(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    piezas smallint unsigned not null,
    frente float(7,2) not null,
    frente_vuelta float(7,2) not null,
    plastico_frente float(7,2) not null,
    plastico_frente_vuelta float(7,2) not null,
    suaje float(7,2) not null,
    frenteMaq float(7,2) not null,
    frente_vueltaMaq float(7,2) not null,
    plastico_frenteMaq float(7,2) not null,
    plastico_frente_vueltaMaq float(7,2) not null,
    suajeMaq float(7,2) not null,
    primary key(id)

)charset=utf8;

insert into tarjetas_presentacion (descripcion, piezas, frente, frente_vuelta, plastico_frente, plastico_frente_vuelta, suaje,
									frenteMaq, frente_vueltaMaq, plastico_frenteMaq, plastico_frente_vueltaMaq, suajeMaq) values
("Tarjetas presentacion 120", 120, 100, 160, 90, 180, 50, 60, 92, 70, 140, 40),
("Tarjetas presentacion 500", 500, 400, 600, 250, 450, 120, 290, 350, 150, 200, 105),
("Tarjetas presentacion 1000", 1000, 600, 850, 400, 550, 320, 400, 750, 250, 300, 210);

create table pulseras_eventos(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into pulseras_eventos(descripcion, piezas, precio, precioMaq) values
("Pulsera 1-100pz", 100, 3, 2.7),
("Pulsera 101-500pz", 101, 2.5, 2),
("Pulsera 501-1000pz", 501, 2, 1.8),
("Pulsera +1001", 1001, 1.8, 1.5);

create table volante_blanco_negro(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tipo char(50) not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into volante_blanco_negro (descripcion, tipo, piezas, precio, precioMaq) values
("Volante blanco negro 1 millar","1/2 carta duplicado", 1000, 190, 190),
("Volante blanco negro 2 millar","1/2 carta duplicado", 2000, 320, 320),
("Volante blanco negro 1 millar","1/2 carta offset", 1000, 390, 360),
("Volante blanco negro 2 millar","1/2 carta offset", 2000, 590, 460);

create table volante_color(
	id smallint unsigned AUTO_INCREMENT NOT NULL,
    descripcion char(200) not null,
    tipo char(50) not null,
    piezas smallint unsigned not null,
    precio float(7,2) not null,
    precioMaq float(7,2) not null,
    primary key(id)
)charset=utf8;

insert into volante_color (descripcion, tipo, piezas, precio, precioMaq) values
("Volante color 500pz", "10x15cm", 500, 450, 400),
("Volante color 1000pz", "10x15cm", 1000, 850, 750),
("Volante color 2000pz", "10x15cm", 2000, 1600, 1500),
("Volante color 500pz", "1/2 carta", 500, 980, 400),
("Volante color 1000pz", "1/2 carta", 1000, 1300, 1300),
("Volante color 2000pz", "1/2 carta", 2000, 1800, 1500);

select * from volante_color;
