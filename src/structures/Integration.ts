import User from "./User";

enum IntegrationExpireBehaviors {
    Renive_role = 0,
    Kick = 1,
}

interface Account {
    id: string
    name: string
}

interface Application {
    id: string
    name: string
    icon: string
    description: string
    summary: string
    bot?: User
}

class Integration {
    id: string;
    name: string;
    type: "twitch" | "youtube" | "discord";
    enabled: boolean;
    syncing?: boolean;
    role_id?: string;
    enable_emoticons?: boolean;
    expire_behavior?: IntegrationExpireBehaviors;
    expire_grace_period?: number
    user?: User
    account: Account
    synced_at?: string
    subscriber_count?: number
    revoked?: boolean
    application?: Application
    constructor() {}
}

export default Integration;
