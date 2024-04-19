--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS recipes;

--
-- Create Tables
--

-- Table for storing recipes
CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT,
    uri VARCHAR(255) NOT NULL,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    completed tinyint(1) NOT NULL,
    source VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    username VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `users`; 
-- Table for multiple users
CREATE TABLE `users`(
	id INT NOT NULL AUTO_INCREMENT, 
	username VARCHAR(255) NOT NULL, 
	password VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id)
);