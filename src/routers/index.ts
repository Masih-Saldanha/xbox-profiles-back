import { Router } from "express";

import accountRouter from "./accountRouter.js";

const router = Router();

router.use("/", accountRouter);

export default router;