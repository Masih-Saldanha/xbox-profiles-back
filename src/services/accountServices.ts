import axl from "app-xbox-live";

import accountRepository from "../repositories/accountRepository.js";

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

async function getAccountData(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.get(xuid);
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
async function getAchievements(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.achievement.all.get(xuid);
    return request;
};

// Lista as últimas conquistas
async function getLastAchievements(gamertag: string, amount: number = 15) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.activity.get(xuid, amount);
    return request;
};

// Lista todos os jogos
async function getAllGames(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.games.get(xuid);
    return request;
};

// Mostra se está on-line e onde jogou o último jogo (titleId) (PC incluso)
async function getStatusOnLine(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.presence.get(xuid);
    const data = {
        state: request[0].state,
        lastSeenDeviceType: request[0].lastSeen.deviceType,
        lastSeenTitleId: request[0].lastSeen.titleId,
        lastSeenTitleName: request[0].lastSeen.titleName,
        lastSeenTimestamp: request[0].lastSeen.timestamp,
    };
    return data;
};

// Mostra últimos clipes
async function getLastClips(gamertag: string, amount: number = 10 + 6) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.gameclip.get(xuid, amount);
    const videoDataArray = [];
    for (let i = 0; i < request.items.length; i++) {
        const element = request.items[i];
        const videoData = {
            clipThumbnail: element.clipThumbnail,
            downloadUri: element.downloadUri,
            dateRecorded: element.dateRecorded,
            contentImageUri: element.contentImageUri,
            contentTitle: element.contentTitle,
            platform: element.platform,
        };
        videoDataArray.push(videoData);
    };
    return videoDataArray;
};

// Lista amigos do usuário
async function getFriendsList(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.friends.get(xuid);
    return request;
};

// Lista TODAS as conquistas
async function getAllAchievements(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.achievement.titles.complete.get(xuid);
    return request;
};

// *Mais inútil* Lista todos os jogos que obteve conquista
async function getAllGamesAndAchievementsList(gamertag: string) {
    const xuid = await returnXuid(gamertag);
    const xl = await xboxRequester();
    const request = await xl.people.achievement.titles.get(xuid);
    return request;
};

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
    getAccountData,
    getAchievements,
    getLastAchievements,
    getAllGames,
    getStatusOnLine,
    getLastClips,
    getFriendsList,
    getAllAchievements,
    getAllGamesAndAchievementsList,
};

export default accountServices;