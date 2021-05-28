import GuildMember from "./GuildMember";
import User from "./User";
import Message from "./Message";
import Role from "./Role";
import Channel from "./Channel";
import { ApplicationCommandOptionType } from "./Application";

// https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
enum InteractionType {
    Ping = 1,
    ApplicationCommand = 2,
    MessageComponent = 3,
}

// https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata
interface ApplicationCommandInteractionData {
    id: string;
    name: string;
    resolved?: ApplicationCommandInteractionDataResolved;
    options?: ApplicationCommandInteractionDataOption[];
    custom_id: string;
    component_type: number;
}

// https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataresolved
interface ApplicationCommandInteractionDataResolved {
    users?: Map<string, User>;
    members?: Map<string, GuildMember>;
    roles?: Map<string, Role>
    channels?: Map<string, Channel>
}

// https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption
interface ApplicationCommandInteractionDataOption {
    name: string
    type: ApplicationCommandOptionType
    value?: any
    options?: ApplicationCommandInteractionDataOption[]
}

// https://discord.com/developers/docs/interactions/slash-commands#interaction
class Interaction {
    readonly id: string;
    readonly application_id: string;
    readonly type: InteractionType;
    readonly data?: ApplicationCommandInteractionData;
    readonly guild_id?: string;
    readonly channel_id?: string;
    readonly member?: GuildMember;
    readonly user?: User;
    readonly token: string;
    static readonly version: 1;
    readonly message?: Message;

    constructor() {}
}

export default Interaction;
