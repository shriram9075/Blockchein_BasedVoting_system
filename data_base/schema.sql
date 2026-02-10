CREATE DATABASE securevote;

USE securevote;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE voter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  voter_id VARCHAR(50),
  age INT,
  has_voted BOOLEAN
);
