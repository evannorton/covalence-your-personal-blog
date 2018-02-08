drop procedure spBlogTags;

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