import { Accounts } from "@prisma/client";

import { prisma } from "../config/database.js";

export type AccountData = Omit<Accounts, "id">;

async function findXuidByGamertag(gamertag: string) {
    return prisma.accounts.findUnique({ where: { gamertag } });
};

async function registerGamertag(data: AccountData) {
    await prisma.accounts.create({ data });
}

const accountRepository = {
    findXuidByGamertag,
    registerGamertag,
};

export default accountRepository;