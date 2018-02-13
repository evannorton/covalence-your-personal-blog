drop table Tokens;

drop table Users;
drop table Blogs;
drop table Tags;
drop table BlogTags;

create table Users (
	id int not null auto_increment primary key,
    email text not null,
    password text not null,
    _created datetime default current_timestamp);
    
create table Tokens (
	id int not null auto_increment primary key,
    userid int not null,
    FOREIGN KEY (userid) REFERENCES Users(id));

create table Blogs (
	id int not null auto_increment primary key,
    title text not null,
    content text not null,
    _created datetime default current_timestamp);
    
create table Tags (
    id int not null auto_increment primary key,
	name text not null,
    _created datetime default current_timestamp);
    
create table BlogTags (
    blogid int not null,
	tagid int not null,
	constraint pk_blogtags primary key(blogid, tagid),
    _created datetime default current_timestamp);