import { Router } from "express";
import personRouter from "./persons.mjs";
const router = Router();

router.use(personRouter);

export default router;
