# discord-slash-commands-client

An easy way to create and manage discord slash-commands.

# Support

You can contact us on our [Discord server](https://discord.gg/2qFkF3qqmu)

# Usage

```js
const interactions = require("discord-slash-commands-client");
// TypeScript: import interactions from "discord-slash-commands-client";

const client = new interactions.Client(
  "you unique bot token",
  "your bots user id"
);
// list all your existing commands.
client.getCommands().then(console.log).catch(console.error);

// will create a new command and log its data. If a command with this name already exist will that be overwritten.
client
  .createCommand({
    name: "unique command name",
    description: "description for this unique command",
  })
  .then(console.log)
  .catch(console.error);

// will edit the details of a command.
client
  .editCommand(
    { name: "new command name", description: "new command description" },
    "id of the command you wish to edit"
  )
  .then(console.log)
  .catch(console.error);

// will delete a command
client
  .deleteCommand("id of the command you wish to delete")
  .then(console.log)
  .catch(console.error);
```

# API

Passing a guildID is optional. Doing so will make the command only be available on that guild.
Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.

[Discord api documentation on slash commands](https://discord.com/developers/docs/interactions/slash-commands)

### getCommands(options: getCommandOptions) returns Promise< array of ApplicationOptions>

- `getCommandsOptions` - List of options can be found [here](#options).

### createCommand(options: ApplicationCommandOptions, guildID?: string) returns Promise<ApplicationOptions>

- `ApplicationOptions` - List of options can be found [here](#options).
- `guildID` - guild to create this command on.

### editCommand(options: ApplicationCommandOptions, commandID: string, guildID?: string) returns Promise<ApplicationOptions>

- `ApplicationOptions` - List of options can be found [here](#options).
- `commandID` - ID of the command you wish to edit.
- `guildID` - If the command is a part of a guild you must pass the guildID here.

### deleteCommand(commandID: string, guildID?: string) returns Promise<boolean>

- `commandID` - ID of the command you wish to delete.
- `guildID` - If the command is a part of a guild you must pass the guildID here.

### getCommandPermissions(guildID: string, commandID?: string) returns Promise<GuildApplicationCommandPermissions[] | GuildApplicationCommandPermissions>;

- `guildID` - the guild id to get permissions for
- `commandID` - ID of the command you wish to get permissions for

### editCommandPermissions(permissions: ApplicationCommandPermissions[], guildID: string, commandID: string) returns Promise<GuildApplicationCommandPermissions>

- `ApplicationCommandPermissions` - list of permissions
- `guildID` - The guild ID the permissions should apply for
- `commandID` - The command ID the permissions should apply for

# Options

Properties marked with `?` are optional.

### ApplicationCommandOption

```js
{
    name: "name of this unique command",
    description: "description for this unique command",
    options?: [
        {
        name: "name of this option",
        description: "description for this option",
        type: 1,// Type for this option. for a list of types see https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
        default?: true,
        required?: true,
        choices?: [
            {
                name: "string to prefill for this choice",
                value: "value of this choice that will be returned when command is used."
            }
        ]
        }
    ]
}
```

```js
{
  name: "name of the command";
  description: "description of the command";
  options?: Array of ApplicationCommandOption;
}
```

### getCommandsOptions

```js
{
  commandID?: "id of the command you wish to get",
  guildID?: "if the command is a part of a guild u should put the guild id here"
}
```

# Permissions

### [ApplicationCommandPermissions](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions)

```ts
/**
 * Application command permissions allow you to enable or disable commands for specific users or roles within a guild.
 */
interface ApplicationCommandPermissions {
  /** Id of the role or user */
  id: string;

  /** The type of permission (1 = Role, 2 = User) */
  type: 1 | 2;

  /** `true` to allow, `false` to disallow */
  permission: boolean;
}
```

### [GuildApplicationCommandPermissions](https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions)

```ts
/**
 * Returned when fetching the permissions for a command in a guild.
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
```

# Types

You can find a list of Data Models and Types from [here](https://discord.com/developers/docs/interactions/slash-commands#data-models-and-types)

# Interaction with the command

To receive an interaction with the command (when an user uses the command) there are 2 options.

1. You can setup a webhook-based interaction. You can read more about how to do this from the [documentation](https://discord.com/developers/docs/interactions/slash-commands#receiving-an-interaction)
2. If you're using [discord.js](https://discord.js.org/) you can use my own [fork](https://github.com/MatteZ02/discord.js) to receive events for interaction.

## Events

We'll cover using the 2nd option.

Replace your current discord.js with my fork `npm i https://github.com/MatteZ02/discord.js`
You can listen to the interactionCreate event which will fire every time someone uses any of the commands created for your bot.

### Usage with djs

```js
const Discord = require("discord.js");
const interactions = require("discord-slash-commands-client");

// create a new client
const client = new Discord.Client();
const token = "Your unique bot token";

// attach the interaction client to discord.js client
client.interactions = new interactions.Client(token, "You bots user id");

// attach and event listener for the ready event
client.on("ready", () => {
  console.log("Client is ready!");

  // Create a new command that we can test
  client.interactions
    .createCommand({
      name: "ping",
      description: "ping pong",
    })
    .then(console.log)
    .catch(console.error);
});

// attach and event listener for the interactionCreate event
client.on("interactionCreate", async (interaction) => {
  if (interaction.name === "ping") {
    // send an initial reply
    await interaction.reply("Pong");

    // send a followup
    const messageId = await interaction.reply({
      content: "Follow up message",
      embeds: [new MessageEmbed().setDescription("Follow up test")],
    });

    setTimeout(() => {
      // delete initial reply
      interaction.delete();

      // edit 1st followup
      interaction.edit("Edited follow up message", messageId);
    }, 5000);
  }
});

// login
client.login(token);
```

### interaction example response

```JS
id: string;
token: string;
channel: Discord.TextChannel;// The channel where this interaction occurred
guild: Discord.Guild;// The guild where this interaction occurred
member: Discord.GuildMember | null;// The guild member who issued the interaction (will be null if we cannot obtain a guildMember)
author: Discord.User | null;// The user who issued the interaction (will be null if we cannot obtain an user)
name: string;// name of this command
content: string;// content of this command (everything after the main command name)
createdTimestamp: number;// timestamp of this command being used
options: { value: string; name: string }[] | null;// list of options this user inputted to the command
/**
 * Replies to this Interaction.
 *
 * **Note:** Ephemeral messages don't appear to support embeds at this time.
 * @arg input - A message string, embed array, or object containing both
 * @arg ephemeral - Make the reply viewable only to the command sender. If false, reply is public
 * @returns A Promise that resolves a `messageId` which can be used with `.edit(...)` and `.delete(...)`
 */
reply: (
  input?: string | MessageEmbed[] | { content: string; embeds: MessageEmbed[] },
  ephemeral?: boolean,
) => Promise<string>;
/**
 * Edit a previous reply to this Interaction
 *
 * **Note:** Ephemeral messages don't appear to support embeds at this time.
 * @arg input - A message string, embed array, or object containing both
 * @arg messageId - The id of the message to delete. If omitted, the original reply message is deleted.
 */
edit: (
  input?: string | MessageEmbed[] | { content: string; embeds: MessageEmbed[] },
  messageId?: string,
) => Promise<void>;
/**
 * Sends a simple reply that makes the bot say "is thinking..."
 *
 * **Note:** You must use `.edit(...)` if you want to update the reply with an actual message later on.
 * @arg ephemeral - Make the reply viewable only to the command sender. If false, reply is public
 */
thinking: (ephemeral?: boolean) => Promise<void>;
/**
 * Deletes a reply to the Interaction
 *
 * **Note:** You cannot delete ephemeral messages.
 * @arg messageId - The id of the message to delete. If omitted, the original reply message is deleted.
 */
delete: (messageId?: string) => Promise<void>;
```
