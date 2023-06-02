import { Router } from "express";

import accountController from "../controllers/accountController.js";

const accountRouter = Router();

accountRouter.get("/accountandachievements/:gamertag", accountController.getAccountAndAchievements);
accountRouter.get("/accountdata/:gamertag", accountController.getAccountData);
accountRouter.get("/achievements/:gamertag", accountController.getAchievements);
accountRouter.get("/lastachievements/:gamertag", accountController.getLastAchievements);
accountRouter.get("/statusonline/:gamertag", accountController.getStatusOnLine);
accountRouter.get("/lastclips/:gamertag", accountController.getLastClips);
accountRouter.get("/friendslist/:gamertag", accountController.getFriendsList);
// accountRouter.get("/allgames/:gamertag", accountController.getAllGames);
// accountRouter.get("/allachievements/:gamertag", accountController.getAllAchievements);
// accountRouter.get("/allgamesandachievements/:gamertag", accountController.getAllGamesAndAchievementsList);
// accountRouter.get("/game", accountController.findGame);

export default accountRouter;