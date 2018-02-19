import { Router } from 'express';
import Table from "../table";

let router = Router();

let tags = new Table("Tags");

export { router, tags };