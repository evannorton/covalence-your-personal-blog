import { Router } from 'express';
import blogsRouter from './blogs';

let router = Router();

router.use('/blogs', blogsRouter);

export default router;