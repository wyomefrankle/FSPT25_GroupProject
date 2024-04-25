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


