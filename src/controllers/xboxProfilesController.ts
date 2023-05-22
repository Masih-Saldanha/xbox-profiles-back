import { Request, Response } from "express";
import authServices from "../services/authServices.js";

// MECÂNICA INICIAL:
// Antes de toda requisição, irá se verificar no BD se já
// existe alguma gamertag registrada com uma xuid. Caso
// positivo, usa-se o xuid para continuar a requisição,
// caso negatigo, registra-se no BD a gamertag vinculada ao
// xuid e usa-se essa xuid para continuar com a requisição

async function xboxProfile(req: Request, res: Response) {
    const gamertag = "xfelipextkc";
    const amount = 15;

    // ACHA USUÁRIO PELA GT
    // Quando não achar no BD a XUID faz isso pra registrar
    const xl = await authServices.xboxRequester();
    // xl.people.find(gamertag, amount).then((data: any) => {
    //     console.log(data.people[0].xuid);
    //     console.log(data.people[0].displayPicRaw);
    //     console.log(data.people[0].gamertag);
    //     console.log(data.people[0].gamerScore);
    //     console.log(data.people[0].detail.accountTier);
    //     console.log(data.people[0].detail.hasGamePass);
    //     console.log(data.people[0].detail.followerCount);
    //     console.log(data.people[0].detail.followingCount);

    //     res.status(200).send(data);
    // });

    // ACHA USUÁRIO PELA XUID
    // Quando tiver registro do xuidd no BD usa aqui
    const xuid = "2533274893245207";
    // xl.people.get(xuid).then((data: any) => {
    //     console.log(data.people[0].xuid);
    //     console.log(data.people[0].displayPicRaw);
    //     console.log(data.people[0].gamertag);
    //     console.log(data.people[0].gamerScore);
    //     console.log(data.people[0].detail.accountTier);
    //     console.log(data.people[0].detail.hasGamePass);
    //     console.log(data.people[0].detail.followerCount);
    //     console.log(data.people[0].detail.followingCount);

    //     res.status(200).send(data);
    // });

    const titleId = "1717113201";
    // Estatísticas de um título específico de um usuário
    // xl.people.achievement.stats.get(xuid, titleId).then((data: any) => {
    //     console.log(parseInt(data.statlistscollection[0].stats[0].value)); // Minutos jogados

    //     res.status(200).send(data);
    // });

    // Lista as últimas conquistas
    // xl.people.activity.get(xuid, amount).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // Lista todos os jogos
    // xl.people.games.get(xuid).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // Mostra se está on-line e onde jogou o último jogo (titleId) (PC incluso)
    // xl.people.presence.get(xuid).then((data: any) => {
    //     console.log(data[0].state);
    //     console.log(data[0].lastSeen.deviceType);
    //     console.log(data[0].lastSeen.titleId);
    //     console.log(data[0].lastSeen.titleName);
    //     console.log(data[0].lastSeen.timestamp);

    //     res.status(200).send(data);
    // });

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

    // Mostra últimos clipes
    // xl.people.gameclip.get(xuid, amount).then((data: any) => {
    //     const clipIndex = 0;
    //     console.log(data.items[clipIndex].clipThumbnail);
    //     console.log(data.items[clipIndex].downloadUri);
    //     console.log(data.items[clipIndex].dateRecorded);
    //     console.log(data.items[clipIndex].contentImageUri);
    //     console.log(data.items[clipIndex].contentTitle);
    //     console.log(data.items[clipIndex].platform);
    //     res.status(200).send(data);
    // });

    // Lista amigos do usuário
    // xl.people.friends.get(xuid).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // Lista todos os jogos e conquistas totais de cada
    // xl.people.achievement.all.get(xuid).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // Lista todas as conquistas de um jogo e mostra se o usuário já conseguiu ou não cada uma
    // xl.people.achievement.get(xuid, titleId, amount).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // *Mais inútil* Lista todos os jogos que obteve conquista
    // xl.people.achievement.titles.get(xuid).then((data: any) => {
    //     res.status(200).send(data);
    // });

    // Lista TODAS as conquistas
    // xl.people.achievement.titles.complete.get(xuid).then((data: any) => {
    //     res.status(200).send(data);
    // });
};

const xboxProfilesController = {
    xboxProfile,
};

export default xboxProfilesController;