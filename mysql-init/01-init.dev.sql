-- Crear bases de datos
CREATE DATABASE IF NOT EXISTS db_development_ePayco;

-- Permiso de usuario
GRANT ALL PRIVILEGES ON db_development_ePayco.* TO 'userdev'@'%';
FLUSH PRIVILEGES;

-- --- Tablas para Development ---
USE db_development_ePayco;

-- --- Tablas para Development ---
CREATE TABLE IF NOT EXISTS users ( 
    document INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    balance DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions ( 
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    document INT NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    tokenConfirmation VARCHAR(500),
    sessionExp BIGINT
)