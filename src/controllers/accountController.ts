import { Request, Response } from "express";

import accountServices from "../services/accountServices.js";
// import gameServices from "../services/gameServices.js";

async function getAccountAndAchievements(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const accountData = await accountServices.getAccountAndAchievementsData(gamertag);

    res.send(accountData).status(200);
};

async function getAccountData(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const accountData = await accountServices.getAccountData(gamertag);

    res.send(accountData).status(200);
};

async function getAchievements(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const achievements = await accountServices.getAchievements(gamertag);

    res.send(achievements).status(200);
};

async function getLastAchievements(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const achievements = await accountServices.getLastAchievements(gamertag);

    res.send(achievements).status(200);
};

async function getStatusOnLine(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const achievements = await accountServices.getStatusOnLine(gamertag);

    res.send(achievements).status(200);
};

async function getLastClips(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const achievements = await accountServices.getLastClips(gamertag);

    res.send(achievements).status(200);
};

async function getFriendsList(req: Request, res: Response) {
    const gamertag = req.params.gamertag;

    const achievements = await accountServices.getFriendsList(gamertag);

    res.send(achievements).status(200);
};

// async function getAllGames(req: Request, res: Response) {
//     const gamertag = req.params.gamertag;

//     const achievements = await accountServices.getAllGames(gamertag);

//     res.send(achievements).status(200);
// };

// async function getAllAchievements(req: Request, res: Response) {
//     const gamertag = req.params.gamertag;

//     const achievements = await accountServices.getAllAchievements(gamertag);

//     res.send(achievements).status(200);
// };

// async function getAllGamesAndAchievementsList(req: Request, res: Response) {
//     const gamertag = req.params.gamertag;

//     const achievements = await accountServices.getAllGamesAndAchievementsList(gamertag);

//     res.send(achievements).status(200);
// };

// async function findGame(req: Request, res: Response) {
//     const game = await gameServices.findGame();

//     res.send(game).status(200);
// };

const accountController = {
    getAccountAndAchievements,
    getAccountData,
    getAchievements,
    getLastAchievements,
    getStatusOnLine,
    getLastClips,
    getFriendsList,
    // getAllGames,
    // getAllAchievements,
    // getAllGamesAndAchievementsList,
    // findGame,
};

export default accountController;