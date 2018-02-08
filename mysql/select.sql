insert into Blogs(title, content)
values('my title', 'my content');

insert into Tags(name)
values('my tag');

insert into BlogTags(blogid, tagid)
values(1, 1);

call spBlogTags(1);