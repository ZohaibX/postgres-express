CREATE DATABASE perntodo;

-- psql -U postgres
-- password would be my password
-- \l for all the databases
-- \c <database name> -- to go inside the database
-- \dt to see all the relations in that database
-- paste these commands there to create database and table 
-- SELECT * FROM <table_name>; -- to see all the relations in the table

CREATE TABLE todo(
  id SERIAL PRIMARY KEY ,
  description VARCHAR(255) 
);

