import { Router } from 'express';
import Table from "../table";
import { tags } from "./tags";

let router = Router();

let blogs = new Table("Blogs");
let blogtags = new Table("BlogTags");


router.get('/:id?', (req, res) => {

    let id = req.params.id;

    if (id) {
        blogs.getBlog(id)
            .then((blog) => {
                return tags.getBlogTag(id).then((tags) => {
                    blog.tags = tags;
                    return blog;
                })
            }).then((blog) => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        blogs.getBlogs()
            .then((blogs) => {
                res.send(blogs);
            })
            .catch((err) => {
                console.log(err)
            });
    }

});

router.post("/", (req, res) => {

    let blog = {
        title: req.body.title,
        content: req.body.content
    }

    let tagsArr = req.body.tags;

    for (let i = 0; i < tagsArr.length; i++) {
        if (tagsArr[i] === "") {
            tagsArr.splice(i, i + 1);
        }
    }

    blogs.insert(blog)
        .then((blogid) => {
            blogid = blogid.id;
            return Promise.all(tagsArr.map((tag) => {
                return tags.find({ name: tag })
                    .then((duplicates) => {
                        //if tag already exists
                        if (duplicates.length > 0) {
                            return duplicates[0];
                        }
                        //if tag does not already exist
                        else {
                            return tags.insert({ name: tag });
                        }
                    })
                    .then((tagid) => {
                        tagid = tagid.id;
                        return blogtags.insert(
                            {
                                blogid,
                                tagid
                            }
                        );
                    });
            }));
        })
        .then(() => {
            res.sendStatus(200);
        }).catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let id = req.params.id;

    blogs.update(id, req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;

    blogs.delete(id)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;