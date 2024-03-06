import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
//When using next.js everytime u save a file it happens the hot-reload, creating a bunch of new PrismaClient. So what we're doing to solve this that if we're not in production we store that in globalThis and globalThis is not affected from hot reload so that way we prevent that hot reaload. 

if (process.env.NODE_ENV !== "production") globalThis.prisma = db; 
