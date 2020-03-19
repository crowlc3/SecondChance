CREATE DATABASE secondchance;
GRANT ALL PRIVILEGES ON DATABASE secondchance TO sdd;

CREATE TABLE master(
    url TEXT PRIMARY KEY,
    score INT,
    safe BOOLEAN,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE
);