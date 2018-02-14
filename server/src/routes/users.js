import { Router } from 'express';
import Table from "../table";
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';

let router = Router();
let users = new Table("Users");

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});

router.get("/id?", (req, res) => {
    let id = req.params.id;
    if (id) {
        users.getOne(id)
            .then((user) => {
                res.send(user);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        users.getAll()
            .then((users) => {
                res.send(users);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

router.post("/", (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    };
    users.insert(user)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.sendStatus(500);
        })
});

export default router;