import { Router } from "express";
import authRouter from "./auth";
import blogsRouter from "./blogs";
import { router as tagsRouter } from "./tags";
import usersRouter from "./users";
import { isLoggedIn, tokenMiddleware } from "../middleware/auth.mw"

let router = Router();

router.use("/auth", authRouter);

router.use("/users", usersRouter);
router.use("/tags", tagsRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use("/blogs", blogsRouter);

export default router;