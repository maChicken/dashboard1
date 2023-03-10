CREATE DATABASE dashboard;

\connect dashboard

CREATE TABLE movies (
movie_id SERIAL PRIMARY KEY,
movie_title VARCHAR(255) UNIQUE NOT NULL,
release_date DATE NOT NULL,
runtime INTEGER NOT NULL,
genre VARCHAR(255) NOT NULL,
rating NUMERIC(3,1) NOT NULL
);

CREATE TABLE characters (
character_id SERIAL PRIMARY KEY,
movie_id INTEGER NOT NULL REFERENCES movies (movie_id) ON DELETE CASCADE,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
date_of_birth DATE NOT NULL,
gender VARCHAR(10) NOT NULL,
nominations INTEGER,
runtime NUMERIC(20,2)
);

INSERT INTO movies (movie_title, release_date, runtime, genre, rating)
VALUES ('The Shawshank Redemption', '1994-09-22', 142, 'Drama', 9.3),
('The Godfather', '1972-03-24', 175, 'Crime', 9.2),
('The Dark Knight', '2008-07-18', 152, 'Action', 9.0),
('Schindler''s List', '1993-11-30', 195, 'Drama', 8.9);

INSERT INTO characters (movie_id, first_name, last_name, date_of_birth, gender, nominations, runtime)
VALUES (1, 'Tim', 'Robbins', '1958-10-16', 'M', 1, 40.5),
(1, 'Morgan', 'Freeman', '1937-06-01', 'M', 1, 90.0),
(2, 'Marlon', 'Brando', '1924-04-03', 'M', 2, 100.0),
(2, 'Al', 'Pacino', '1940-04-25', 'M', 1, 120.0),
(3, 'Christian', 'Bale', '1974-01-30', 'M', 0, 80.0),
(3, 'Heath', 'Ledger', '1979-04-04', 'M', 1, 15.5),
(3, 'Liam', 'Neeson', '1952-06-07', 'M', 0, 75.0),
(3, 'Ben', 'Kingsley', '1943-12-31', 'M', 1, 50.0);