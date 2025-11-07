-- Crear bases de datos
CREATE DATABASE IF NOT EXISTS db_production_ePayco;

-- Permiso de usuario
GRANT ALL PRIVILEGES ON db_production_ePayco.* TO 'userdev'@'%';
FLUSH PRIVILEGES;

-- --- Tablas para Development ---
USE db_production_ePayco;

-- --- Tablas para Development ---
CREATE TABLE IF NOT EXISTS users ( 
    document INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    balance DECIMAL(10,2) NOT NULL
);