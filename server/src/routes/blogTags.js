/*
import { Router } from 'express';
import Table from "../table";

let router = Router();

let tags = new Table("Tags");



router.get('/:id?', (req, res) => {

    let id = req.params.id;

    if (id) {
        tags.getOne(id)
            .then(tag => {
                res.send(tag)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        tags.getAll()
            .then(tags => {
                res.send(tags);
            })
            .catch((err) => {
                console.log(err)
            });
    }

});

router.post("/", (req, res) => {
    let tag = req.body;

    tags.insert(tag)
        .then(id => {
            res.send(id);
        });
});

export default router;
*/