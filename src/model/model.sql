CREATE DATABASE exam;

\c exam;

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) 
);

INSERT INTO companies(name) VALUES('Akfa');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) UNIQUE,
    password VARCHAR(20),
    full_name VARCHAR(50),
    company_id INT REFERENCES companies(id),
    role VARCHAR(50) 
);

INSERT INTO users(login, password, full_name, company_id, role) VALUES('Ali', '1111', 'Aliyev Ali', '1', 'admin');

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250),
    description TEXT,
    company_id INT REFERENCES companies(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_tasks(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    status VARCHAR(50) 
);