import { Router } from "express";

import xboxProfilesController from "../controllers/xboxProfilesController.js";

const xboxProfilesRouter = Router();

xboxProfilesRouter.get("/", xboxProfilesController.xboxProfile);

export default xboxProfilesRouter;