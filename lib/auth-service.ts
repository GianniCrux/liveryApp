import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => { //getSelf is the function we're gona use to fetch information about our users
    const self = await currentUser();

    if(!self || !self.username){ //If there's no user or no username
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({ //Tetch the user from the database
        where: { externalUserId: self.id },
    });

    if(!user) {
        throw new Error("Not found");
    }

    return user;
};

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (self.username !== user.username) {
        throw new Error("Unauthorized");
    }

    return user;
};