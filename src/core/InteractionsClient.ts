import axios from "axios";
import {
    ApplicationCommand,
    ApplicationCommandPermissions,
    ApplicationOptions,
    getCommandsOptions,
    GuildApplicationCommandPermissions,
} from "./interfaces";

const apiUrl = "https://discord.com/api/v8";

export default class InteractionsClient {
    private token: string;
    public clientID: string;

    constructor(token: string, clientID: string) {
        if (!token) {
            throw new Error("discord-slash-commands-client | No token provided");
        }
        if (!clientID) {
            throw new Error("discord-slash-commands-client | No clientID provided");
        }
        this.token = token;
        this.clientID = clientID;
    }

    async getCommands(
        options?: getCommandsOptions
    ): Promise<ApplicationCommand[] | ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("options must be of type object. Received: " + typeof options);

        if (options.commandID && typeof options.commandID !== "string")
            throw new Error(
                "commandID received but wasn't of type string. received: " +
                    typeof options.commandID
            );

        if (options.guildID && typeof options.guildID !== "string")
            throw new Error(
                "guildID received but wasn't of type string. received: " + typeof options.guildID
            );

        let url = options.guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${options.guildID}/commands`
            : `${apiUrl}/applications/${this.clientID}/commands`;

        if (options.commandID) url += `/${options.commandID}`;

        const res = await axios.get(url, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async createCommand(
        options: ApplicationOptions,
        guildID?: string
    ): Promise<ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("options must be of type object. Received: " + typeof options);

        if (!options.name || !options.description)
            throw new Error("options is missing name or description property!");

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
            : `${apiUrl}/applications/${this.clientID}/commands`;

        const res = await axios.post(url, options, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async editCommand(
        options: ApplicationOptions,
        commandID: string,
        guildID?: string
    ): Promise<ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("options must be of type object. Received: " + typeof options);

        if (typeof commandID !== "string")
            throw new Error("commandID must be of type string. Received: " + typeof commandID);

        if (!options.name || !options.description)
            throw new Error("options is missing name or description property!");

        if (guildID && typeof guildID !== "string")
            throw new Error(
                "guildID received but wasn't of type string. received: " + typeof guildID
            );

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

        const res = await axios.patch(url, options, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async deleteCommand(commandID: string, guildID?: string): Promise<boolean> {
        if (typeof commandID !== "string")
            throw new Error("commandID must be of type string. Received: " + typeof commandID);

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

        const res = await axios.delete(url, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async getCommandPermissions(
        guildID: string,
        commandID?: string
    ): Promise<GuildApplicationCommandPermissions[] | GuildApplicationCommandPermissions> {
        if (typeof guildID !== "string")
            throw new Error("guildID must be of type string. Received: " + typeof guildID);

        if (commandID && typeof commandID !== "string")
            throw new Error(
                "commandID received but wasn't of type string. received: " + typeof commandID
            );

        const url = commandID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`
            : `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/permissions`;

        const res = await axios.get(url, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    public async editCommandPermissions(
        permissions: ApplicationCommandPermissions[],
        guildID: string,
        commandID: string
    ): Promise<GuildApplicationCommandPermissions> {
        if (!Array.isArray(permissions))
            throw new Error("permissions must be of type array. Received: " + typeof permissions);
        if (typeof guildID !== "string")
            throw new Error("guildID must be of type string. Received: " + typeof guildID);
        if (typeof commandID !== "string")
            throw new Error("commandID must be of type string. Received: " + typeof commandID);

        const url = `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`;

        const res = await axios.put(
            url,
            { permissions: permissions },
            {
                headers: { Authorization: `Bot ${this.token}` },
            }
        );

        return res.data;
    }
}
