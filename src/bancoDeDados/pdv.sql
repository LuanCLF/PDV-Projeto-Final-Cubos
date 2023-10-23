--SCHEMA REMOVER O COMENTARIO NO DEPLOY--

CREATE DATABASE pdv;

CREATE TABLE usuarios(
id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(100) NOT NULL
);
CREATE TABLE categorias(
id SERIAL PRIMARY KEY NOT NULL,
descricao VARCHAR(100) NOT NULL
);

INSERT INTO categorias
(descricao) 
VALUES 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games')