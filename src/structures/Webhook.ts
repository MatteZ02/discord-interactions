import User from "./User";
import Guild from "./Guild"
import Channel from "./Channel";

enum WebhookType {
    Incoming = 1,
    Channel_Follower = 2,
    Application = 3,
}

class Webhook {
    id: string;
    type: WebhookType;
    guild_id?: string
    channel_id?: string
    user?: User
    name: string
    avatar: string
    token?: string
    application_id: string
    source_guild?: Guild
    source_channel?: Channel
    url?: string

    constructor() {}
}

export default Webhook
