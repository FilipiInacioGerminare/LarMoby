-- Destruidor de banco 
DROP VIEW IF EXISTS vw_itens_carrinho;
DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS endereco;
DROP TABLE IF EXISTS categoria;

-- Tabela cliente
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    telefone VARCHAR(20),
    data_cadastro DATE,
    status VARCHAR(50),
    admin BOOLEAN DEFAULT FALSE
);

-- Tabela endereco
CREATE TABLE endereco (
    id_endereco SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    cep VARCHAR(10),
    bairro VARCHAR(255),
    numero VARCHAR(10),
    rua VARCHAR(255),
    estado VARCHAR(50),
    cidade VARCHAR(255),
    complemento VARCHAR(255)
);

-- Tabela categoria
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(255)
);

-- Tabela produto
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    preco DECIMAL(10, 2),
    imagem_url VARCHAR(255),
    destaque BOOLEAN,
    qnt_estoque INT,
    id_categoria INT REFERENCES categoria(id_categoria)
);

-- Tabela pedido
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_endereco INT REFERENCES endereco(id_endereco),
    total DECIMAL(10, 2),
    data_pedido DATE,
    status VARCHAR(50)
);

-- Tabela item_pedido
CREATE TABLE item_pedido (
    id_item_pedido SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES pedido(id_pedido),
    id_produto INT REFERENCES produto(id_produto),
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2)
);

-- Inserir dados na tabela cliente
INSERT INTO cliente (nome, email, senha, telefone, data_cadastro, status, admin) VALUES
('João da Silva', 'joao.silva@email.com', 'senha123', '11999999999', '2023-10-26', 'ativo', false),
('Maria Oliveira', 'maria.oliveira@email.com', 'senha456', '21988888888', '2023-10-25', 'ativo', false),
('Pedro Santos', 'pedro.santos@email.com', 'senha789', '31977777777', '2023-10-24', 'inativo', false);

-- Inserir dados na tabela endereco
INSERT INTO endereco (id_cliente, cep, bairro, numero, rua, estado, cidade, complemento) VALUES
(1, '01001000', 'Centro', '123', 'Rua Principal', 'SP', 'São Paulo', 'Apto 101'),
(2, '20010000', 'Copacabana', '456', 'Avenida Atlântica', 'RJ', 'Rio de Janeiro', NULL),
(3, '30010000', 'Savassi', '789', 'Rua da Bahia', 'MG', 'Belo Horizonte', 'Casa');

-- Inserir dados na tabela categoria
INSERT INTO categoria (nome) VALUES
('Eletrônicos'),
('Livros'),
('Roupas');

-- Inserir dados na tabela produto
INSERT INTO produto (nome, descricao, preco, imagem_url, destaque, qnt_estoque, id_categoria) VALUES
('Smartphone XYZ', 'Smartphone com tela de 6 polegadas', 1200.00, 'smartphone.jpg', TRUE, 10, 1),
('Livro de Ficção', 'Um romance emocionante', 50.00, 'livro.jpg', FALSE, 20, 2),
('Camiseta Básica', 'Camiseta de algodão confortável', 30.00, 'camiseta.jpg', TRUE, 50, 3);

-- Inserir dados na tabela pedido
INSERT INTO pedido (id_cliente, id_endereco, total, data_pedido, status) VALUES
(1, 1, 150.00, '2023-10-27', 'pendente'),
(2, 2, 200.00, '2023-10-26', 'pago'),
(1, 1, 75.00, '2023-10-28', 'enviado');

-- Inserir dados na tabela item_pedido
INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_unitario, subtotal) VALUES
(1, 1, 1, 1200.00, 1200.00),
(1, 2, 2, 50.00, 100.00),
(2, 3, 3, 30.00, 90.00);

-- Inserir admin
INSERT INTO cliente (nome, email, senha, telefone, data_cadastro, status, admin) VALUES
('Admin', 'admin@email.com', 'admin123', '11999999999', '2024-10-25', 'ativo', true);

select * from cliente;
select * from endereco;
select * from pedido;
select * from produto;
select * from item_pedido;


