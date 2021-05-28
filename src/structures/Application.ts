import User from "./User";
import Team from "./interfaces/Team"

// ApplicationCommand https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
export interface ApplicationCommand {
    id: string;
    application_id: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permissions?: boolean;
}

// ApplicationCommandOption https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption
export interface ApplicationCommandOption {
    name: string;
    description: string;
    type: number;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}

// ApplicationCommandOptionType https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
}

// https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice
export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}

// https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions
export interface ApplicationCommandPermissions {
    id: string;

    type: ApplicationCommandPermissionType;

    permission: boolean;
}

// https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissiontype
export enum ApplicationCommandPermissionType {
    ROLE = 1,
    USER = 2,
}

enum ApplicationFlags {
    GATEWAY_PRESENCE = 1 << 12,
    GATEWAY_PRESENCE_LIMITED = 1 << 13,
    GATEWAY_GUILD_MEMBERS = 1 << 14,
    GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
    VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
    EMBEDDED = 1 << 17,
}

class Application {
    id: string;
    name: string;
    icon: string;
    description: string;
    rpc_origins?: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    owner: User;
    summary: string;
    verify_key: string;
    team: Team;
    guild_id?: string;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
    flags: ApplicationFlags;
    constructor() {}
}

export default Application;
