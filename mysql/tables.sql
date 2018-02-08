drop table BlogTags;
drop table Blogs;
drop table Authors;
drop table Tags;

create table Blogs (
	id int not null auto_increment primary key,
    title text not null,
    content text not null,
    _created datetime default current_timestamp);
    
create table Authors (
	id int not null auto_increment primary key,
    name text not null,
    email text not null,
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