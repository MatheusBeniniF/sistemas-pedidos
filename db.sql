USE sistema_pedidos;

CREATE TABLE `produtos` (
    `id_produto` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `preco` DECIMAL(10,2) NOT NULL
);

CREATE TABLE `clientes` (
    `id_cliente` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE `pedidos` (
    `id_pedido` INT AUTO_INCREMENT PRIMARY KEY,
    `data` DATE NOT NULL,
    `id_cliente` INT NOT NULL,
    FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id_cliente`) ON DELETE CASCADE
);

CREATE TABLE `pedido_itens` (
    `id_pedido_item` INT AUTO_INCREMENT PRIMARY KEY,
    `id_pedido` INT NOT NULL,
    `id_produto` INT NOT NULL,
    `qtde` INT NOT NULL,
    `preco` DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`id_pedido`) REFERENCES `pedidos`(`id_pedido`) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES `produtos`(`id_produto`) ON DELETE CASCADE
);
