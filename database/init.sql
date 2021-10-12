BEGIN;

DROP TABLE IF EXISTS users, sessions, posts CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    text_content text,
    created_at timestamp
);

INSERT INTO users (email, password, name) VALUES
(
  'test@gmail.com',
  '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG',
  'Test Testington'
);

INSERT INTO sessions (sid, data) VALUES
(
  'abc123',
  '{"test":"stuff"}'
);

INSERT INTO posts ( user_id, text_content, created_at) VALUES
  (1,  'What is your favorite colour?', (SELECT CURRENT_TIMESTAMP)),
  (1,  'What is your favorite animal?', (SELECT CURRENT_TIMESTAMP));

COMMIT;
