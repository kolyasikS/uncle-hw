import { PrismaClient } from "../../../../db/generated/prisma/client";
export declare class PrismaService extends PrismaClient {
    private readonly url;
    constructor(url: string);
}
