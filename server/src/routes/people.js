import { Router } from 'express';

let router = Router();

let people = new Table("people");



router.get('/', (req, res) => {

    people.getAll()
        .then(users => {
            res.json(people);
        });

});

router.post("/", (req, res) => {
    let person = req.body;

    people.insert(person)
        .then(id => {
            res.json(id);
        });
});

export default router;