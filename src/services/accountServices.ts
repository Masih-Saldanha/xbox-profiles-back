import axl from "app-xbox-live";

import accountRepository from "../repositories/accountRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

function xboxRequester() {
    const email = process.env.TOKEN_EMAIL;
    const password = process.env.TOKEN_PASSWORD;
    const xl = axl.Login(email, password);
    return xl;
};

async function getXuidFromApi(gamertag: string) {
    const amount = 15;
    const xl = await xboxRequester();
    const request = await xl.people.find(gamertag, amount).then();
    throwError(
        !request.people[0],
        "Not Found",
        `The gamertag: "${gamertag}" doesn't exist, inform a valid one!`
    );
    const xuid: string = request.people[0].xuid;
    return xuid;
};

async function returnXuid(gamertag: string) {
    gamertag = gamertag.toLowerCase();
    const existGamertag = await accountRepository.findXuidByGamertag(gamertag);
    if (!!existGamertag) {
        return existGamertag.xuid;
    } else {
        const xuid = await getXuidFromApi(gamertag);
        await accountRepository.registerGamertag({ gamertag, xuid });
        return xuid;
    }
};

async function getAccountAndAchievementsData(gamertag: string, page: number = 0, pagination: number = 10) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();

    const requestGamerTag = await xl.people.get(xuid);
    const gamerTagData = {
        displayPicRaw: requestGamerTag.people[0].displayPicRaw,
        gamertag: requestGamerTag.people[0].gamertag,
        gamerScore: requestGamerTag.people[0].gamerScore,
        accountTier: requestGamerTag.people[0].detail.accountTier,
        hasGamePass: requestGamerTag.people[0].detail.hasGamePass,
        followerCount: requestGamerTag.people[0].detail.followerCount,
        followingCount: requestGamerTag.people[0].detail.followingCount,
    };

    const request = await xl.people.achievement.all.get(xuid);
    const paginatedData = request.titles.slice((page * pagination), ((page * pagination) + pagination));
    const achievementList = [];
    for (const element of paginatedData) {
        const data = {
            titleId: element.titleId,
            name: element.name,
            type: element.type,
            displayImage: element.displayImage,
            achievement: {
                currentAchievements: element.achievement.currentAchievements,
                totalAchievements: element.achievement.totalAchievements,
                currentGamerscore: element.achievement.currentGamerscore,
                totalGamerscore: element.achievement.totalGamerscore,
                progressPercentage: element.achievement.progressPercentage,
            },
            isGamePass: element.gamePass.isGamePass,
            lastTimePlayed: element.titleHistory.lastTimePlayed,
            xboxLiveTier: element.xboxLiveTier,
        };
        achievementList.push(data);
    };

    return {
        gamerTagData,
        achievementList,
    };
};

async function getAccountData(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.get(xuid);
    // console.log(request);
    const accountData = {
        displayPicRaw: request.people[0].displayPicRaw,
        gamertag: request.people[0].gamertag,
        gamerScore: request.people[0].gamerScore,
        accountTier: request.people[0].detail.accountTier,
        hasGamePass: request.people[0].detail.hasGamePass,
        followerCount: request.people[0].detail.followerCount,
        followingCount: request.people[0].detail.followingCount,
    }
    return accountData;
};

// Lista todos os jogos e conquistas totais de cada
async function getAchievements(gamertag: string, page: number = 0, pagination: number = 10) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.achievement.all.get(xuid);
    const paginatedData = request.titles.slice((page * pagination), ((page * pagination) + pagination));
    const achievementsArray = [];
    for (const element of paginatedData) {
        const data = {
            titleId: element.titleId,
            name: element.name,
            type: element.type,
            displayImage: element.displayImage,
            achievement: {
                currentAchievements: element.achievement.currentAchievements,
                totalAchievements: element.achievement.totalAchievements,
                currentGamerscore: element.achievement.currentGamerscore,
                totalGamerscore: element.achievement.totalGamerscore,
                progressPercentage: element.achievement.progressPercentage,
            },
            isGamePass: element.gamePass.isGamePass,
            lastTimePlayed: element.titleHistory.lastTimePlayed,
            xboxLiveTier: element.xboxLiveTier,
        };
        achievementsArray.push(data);
    };
    return achievementsArray;
};

// Lista as últimas conquistas
async function getLastAchievements(gamertag: string, amount: number = 10) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.activity.get(xuid, amount);
    const achievementsArray = [];
    for (const element of request.activityItems) {
        const data = {
            contentTitle: element.contentTitle,
            contentImageUri: element.contentImageUri,
            titleId: element.titleId,
            achievementName: element.achievementName,
            achievementDescription: element.achievementDescription,
            description: element.description,
            achievementIcon: element.achievementIcon,
            gamerscore: element.gamerscore,
            date: element.date,
            rarity: element.activity.rarityCategory,
            isSecret: element.isSecret,
            contentType: element.contentType,
            platform: element.platform,
        }
        achievementsArray.push(data);
    }
    return achievementsArray;
};

// Mostra se está on-line e onde jogou o último jogo (titleId) (PC incluso)
async function getStatusOnLine(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.presence.get(xuid);
    return request;
    // se (state = Offline) => request[0].lastSeen
    // se (state = Online) => request[0].devices
};

// Mostra últimos clipes
async function getLastClips(gamertag: string, amount: number = 10) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.gameclip.get(xuid, amount + 6);
    const videoDataArray = [];
    for (const element of request.items) {
        const videoData = {
            contentTitle: element.contentTitle,
            contentImageUri: element.contentImageUri,
            downloadUri: element.downloadUri,
            clipThumbnail: element.clipThumbnail,
            dateRecorded: element.dateRecorded,
            platform: element.platform,
        };
        videoDataArray.push(videoData);
    };
    return videoDataArray;
};

// Lista amigos do usuário
async function getFriendsList(gamertag: string, page: number = 0, pagination: number = 10) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.friends.get(xuid);
    const friendsData = request.people.slice((page * pagination), ((page * pagination) + pagination));
    const friendsArray = [];
    for (const element of friendsData) {
        const data = {
            xuid: element.xuid,
            gamertag: element.gamertag,
            realName: element.realName,
            displayPicRaw: element.displayPicRaw,
            gamerScore: element.gamerScore,
            presenceState: element.presenceState,
            presenceText: element.presenceText,
        };
        friendsArray.push(data);
    }
    return friendsArray;
};

// // Lista todos os jogos
// async function getAllGames(gamertag: string) {
//     const xuid = await returnXuid(gamertag);
//     const xl = await xboxRequester();
//     const request = await xl.people.games.get(xuid);
//     // console.log(request.titles.length)
//     return request;
// };

// // Lista TODAS as conquistas
// async function getAllAchievements(gamertag: string) {
//     const xuid = await returnXuid(gamertag);
//     const xl = await xboxRequester();
//     const request = await xl.people.achievement.titles.complete.get(xuid);
//     return request;
// };

// // *Mais inútil* Lista todos os jogos que obteve conquista
// async function getAllGamesAndAchievementsList(gamertag: string) {
//     const xuid = await returnXuid(gamertag);
//     const xl = await xboxRequester();
//     const request = await xl.people.achievement.titles.get(xuid);
//     return request;
// };

// Adiciona aos amigos
// xl.people.add(xuid).then(() => {
//     console.log("success");
//     res.sendStatus(200);
// });

// Remove dos amigos
// xl.people.remove(xuid).then(() => {
//     console.log("success");
//     res.sendStatus(200);
// });

// Estatísticas de um título específico de um usuário
// xl.people.achievement.stats.get(xuid, titleId).then((data: any) => {
//     console.log(parseInt(data.statlistscollection[0].stats[0].value)); // Minutos jogados
//     res.status(200).send(data);
// });

// Lista todas as conquistas de um jogo e mostra se o usuário já conseguiu ou não cada uma
// xl.people.achievement.get(xuid, titleId, amount).then((data: any) => {
//     res.status(200).send(data);
// });

const accountServices = {
    getAccountAndAchievementsData,
    xboxRequester,
    getAccountData,
    getAchievements,
    getLastAchievements,
    getStatusOnLine,
    getLastClips,
    getFriendsList,
    // getAllGames,
    // getAllAchievements,
    // getAllGamesAndAchievementsList,
};

export default accountServices;