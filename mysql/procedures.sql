drop procedure spBlogTags;
drop procedure spAllBlogTags;

delimiter //
create procedure spBlogTags
(blogid int)
BEGIN

	select
		Tags.name,
		BlogTags.blogid
    from Tags
    join BlogTags on Tags.id = BlogTags.tagid
    where BlogTags.blogid = blogid;
        
END//
delimiter ;

delimiter //
create procedure spAllBlogTags
()
BEGIN

	select
		Tags.name,
		BlogTags.blogid
    from Tags
    join BlogTags on Tags.id = BlogTags.tagid;
        
END//
delimiter ;