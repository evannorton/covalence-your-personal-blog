import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';

let router = Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);

export default router;