import { Router } from "express";
import authRouter from "./auth";
import blogsRouter from "./blogs";
import usersRouter from "./users";
import { isLoggedIn, tokenMiddleware } from "../middleware/auth.mw"

let router = Router();

router.use("/auth", authRouter);

router.use("/users", usersRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use("/blogs", blogsRouter);

export default router;