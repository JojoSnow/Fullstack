CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text NOT NULL,title text NOT NULL, likes INTEGER DEFAULT 0 );

insert into blogs (author, url, title) values ('Anthony Doerr', 'anthonydoerr.com', 'The Light We Can See');
insert into blogs (author, url, title) values ('Stephen King', 'stephenking.com', 'The Horrors of Homes');