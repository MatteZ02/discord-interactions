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

  /**
   * Application command permissions allow you to enable or disable commands for specific users or roles within a guild.
   * {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions See discord docs}
   */
  interface ApplicationCommandPermissions {
    /** Id of the role or user */
    id: string;

    /** The type of permission (1 = Role, 2 = User) */
    type: 1 | 2;

    /** `true` to allow, `false` to disallow */
    permission: boolean;
  }

  /**
   * Returned when fetching the permissions for a command in a guild.
   * {@link https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions See discord docs}
   */
  interface GuildApplicationCommandPermissions {
    /** Id of the command */
    id: string;

    /** Id of the application the command belongs to */
    application_id: string;

    /** Id of the guild */
    guild_id: string;

    /** Array of ApplicationCommandPermissions */
    permissions: ApplicationCommandPermissions[];
  }

  export class Client {
    constructor(token: string, clientID: string);
    private token: string;
    private clientID: string;
    public getCommands(
      options?: getCommandsOptions
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
    public getCommandPermissions(
      guildID: string,
      commandID?: string
    ): Promise<
      GuildApplicationCommandPermissions[] | GuildApplicationCommandPermissions
    >;
    public editCommandPermissions(
      permissions: ApplicationCommandPermissions[],
      guildID: string,
      commandID: string
    ): Promise<GuildApplicationCommandPermissions>;
  }
}
