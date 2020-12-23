declare module "discord-slash-commands-client" {
  interface getCommandsOptions {
    commandID?: string;
    guildID?: string;
  }

  // ApplicationCommand https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
  interface ApplicationCommand {
    id: string;
    application_id: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
  }

  // ApplicationCommandOption https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption
  interface ApplicationCommandOption {
    name: string;
    description: string;
    type: number;
    default?: boolean;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
  }

  // ApplicationCommandOptionType https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype

  //type ApplicationCommandOptionType = "SUB_COMMAND": 1 | "SUB_COMMAND_GROUP": 2 | "STRING": 3 | "INTEGER": 4 | "BOOLEAN": 5 |  "USER": 6 | "CHANNEL": 7 | "ROLE": 8;
  interface ApplicationCommandOptionChoice {
    name: string;
    value: string;
  }
  interface ApplicationOptions {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
  }

  export class Client {
    constructor(token: string, clientID: string);
    private token: string;
    private clientID: string;
    public getCommands(
      commandID?: string,
      guildID?: string
    ): Promise<ApplicationCommand[] | ApplicationCommand>;
    public createCommand(
      options: ApplicationOptions,
      guildID?: string
    ): Promise<ApplicationCommand>;
    public editCommand(
      options: ApplicationOptions,
      commandID: string,
      guildID?: string
    ): Promise<ApplicationCommand>;
    public deleteCommand(commandID: string, guildID?: string): Promise<boolean>;
  }
}
