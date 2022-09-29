CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text NOT NULL,title text NOT NULL, likes INTEGER DEFAULT 0 );

insert into blogs (author, url, title) values ('Anthony Doerr', 'anthonydoerr.com', 'The Light We Can See');
insert into blogs (author, url, title) values ('Stephen King', 'stephenking.com', 'The Horrors of Homes');

DELETE FROM blogs WHERE blog.id=2;

DROP TABLE users cascade;
DROP TABLE blogs cascade;
DROP TABLE lists cascade;
DROP TABLE reading_lists cascade;
DROP TABLE migrations;

INSERT INTO lists (user_id) values (1);
INSERT INTO lists (user_id) values (2);

INSERT INTO reading_lists (blog_id, list_id) values (1, 1);
INSERT INTO reading_lists (blog_id, list_id) values (2, 1);