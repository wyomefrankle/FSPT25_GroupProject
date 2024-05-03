--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;

--
-- Create Tables
--

-- Table for storing users
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    -- user first name
    firstname VARCHAR(255) NOT NULL,
    -- user last name
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    -- user password
    password TEXT NOT null,
    skintype VARCHAR(255),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  -- Reference to the users table
    product_type VARCHAR(100),
    brand VARCHAR(100),
    name VARCHAR(100),
    price DECIMAL(10, 2),
    imageURL VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Enable foreign key checks
SET foreign_key_checks = 1;
