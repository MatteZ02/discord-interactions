import User from "./User";

class GuildMember {
    readonly user?: User;
    readonly nick?: string;
    readonly roles: string[];
    readonly joined_at: string;
    readonly premium_since?: string;
    readonly deaf: boolean;
    readonly mute: boolean;
    readonly pending?: boolean;
    readonly permissions?: string;

    constructor() {}
}

export default GuildMember;
