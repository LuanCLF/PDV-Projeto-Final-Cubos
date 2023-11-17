
CREATE DATABASE pdv;

CREATE TABLE usuarios(
id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(255) NOT NULL
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

CREATE TABLE clientes (
id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
cep CHAR(8),
rua VARCHAR(100),
numero VARCHAR(10),
bairro VARCHAR(100),
cidade VARCHAR(100),
estado CHAR(2)
);


CREATE TABLE produtos(
id SERIAL PRIMARY KEY NOT NULL,
descricao VARCHAR(255) NOT NULL,
quantidade_estoque INT NOT NULL,
valor INT NOT NULL,
categoria_id SERIAL REFERENCES categorias(id),
produto_imagem VARCHAR(255)
)

 CREATE TABLE pedidos(
   id SERIAL PRIMARY KEY UNIQUE,
   cliente_id INT REFERENCES clientes(id),
   observacao VARCHAR(100),
   valor_total INT NOT NULL
 );

CREATE TABLE pedido_produtos (
  id SERIAL PRIMARY KEY UNIQUE,
  pedido_id INT REFERENCES pedidos(id) NOT NULL,
  produto_id INT REFERENCES produtos(id) NOT NULL,
  quantidade_produto INT NOT NULL,
  valor_produto INT NOT NULL
);



