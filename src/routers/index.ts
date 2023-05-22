import { Router } from "express";

import testRouter from "./testRouter.js";
import xboxProfilesRouter from "./xboxProfilesRouter.js";

const router = Router();

router.use(testRouter);
router.use("/profile", xboxProfilesRouter);

export default router;