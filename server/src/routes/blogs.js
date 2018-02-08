import { Router } from 'express';
import Table from "../table";

let router = Router();

let blogs = new Table("Blogs");



router.get('/:id?', (req, res) => {

    let id = req.params.id;

    if (id) {
        blogs.getOne(id)
            .then(blog => {
                res.send(blog)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        blogs.getAll()
            .then(blogs => {
                res.send(blogs);
            })
            .catch((err) => {
                console.log(err)
            });
    }

});

router.post("/", (req, res) => {
    let blog = req.body;

    blogs.insert(blog)
        .then(id => {
            res.send(id);
        });
});

export default router;