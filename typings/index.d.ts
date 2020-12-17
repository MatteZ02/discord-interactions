import Discord from "discord.js";

interface ApplicationCommandOption {
  name: string;
  description: string;
  type: number;
  required: boolean;
  choices?: { name: string; value: string }[];
}

interface ApplicationCommand {}

interface error {
  code: number;
  errors: object;
  message: string;
}

interface params {
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
}

declare module "discord-interactions" {
  export class Client {
    constructor(token: string, clientID: string);
    private token: string;
    private clientID: string;
    public getCommands(
      commandID?: string,
      guildID?: string
    ): Promise<ApplicationCommand>;
    public createCommand(
      options: params,
      guildID?: string
    ): Promise<ApplicationCommand>;
    public editCommand(
      options: params,
      commandID: string,
      guildID?: string
    ): Promise<ApplicationCommand>;
    public deleteCommand(
      commandID: string,
      guildID?: string
    ): Promise<ApplicationCommand[] | error>;
  }

  export interface interactionCreate {
    channel: Discord.TextChannel;
    guild: Discord.Guild;
    member: Discord.GuildMember | null;
    author: Discord.User | null;
    name: string;
    options: { value: string; name: string }[] | null;
  }
}
