# discord-interactions

An easy way to create and manage discord slash-commands.

# Usage

```js
const interactions = require("discord-interactions");
// TypeScript: import interactions from "discord-interactions";

const client = new interactions.Client(
  "you unique bot token",
  "your bots user id"
);
// list all your existing commands.
client.getCommands().then(console.log);

// will create a new command and log its data. If a command with this name already exist will that be overwritten.
client
  .createCommand({
    name: "unique command name",
    description: "description for this unique command",
  })
  .then(console.log);

// will edit the details of a command.
client
  .editCommand(
    { name: "new command name", description: "new command description" },
    "id of the command you wish to edit"
  )
  .then(console.log);

// will delete a command
client.deleteCommand("id of the command you wish to delete").then(console.log);
```

# API

Passing a guildID is optional. Doing so will make the command only be available on that guild.
Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.

[Discord api documentation on slash commands](https://discord.com/developers/docs/interactions/slash-commands)

### getCommands(commandID?: string, guildID?: string)

- `commandID` - id of the command you wish to obtain.
- `guildID` - id of the guild this command is created for.

### createCommand(options: ApplicationOptions, guildID?: string)

- `ApplicationOptions` - List of options can be found [here](#options).
- `guildID` - guild to create this command on.

### editCommand(options: ApplicationOptions, commandID: string, guildID?: string)

- `ApplicationOptions` - List of options can be found [here](#options).
- `commandID` - ID of the command you wish to edit.
- `guildID` - If the command is a part of a guild you must pass the guildID here.

### deleteCommand(commandID: string, guildID?: string)

- `commandID` - ID of the command you wish to delete.
- `guildID` - If the command is a part of a guild you must pass the guildID here.

# Options

### ApplicationOptions

Properties marked with `?` are optional.

```js
{
    name: "name of this unique command",
    description: "description for this unique command",
    options?: [
        {
        name: "name of this option",
        description: "description for this option",
        type: 1,// Type for this option
        required: true,
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

### Types

You can find a list of Data Models and Types from [here](https://discord.com/developers/docs/interactions/slash-commands#data-models-and-types)

# Interaction with the command

To receive an interaction with the command (when an user uses the command) there are 2 options.

1. You can setup a webhook-based interaction. You can read more about how to do this from the [documentatio](https://discord.com/developers/docs/interactions/slash-commands#receiving-an-interaction)
2. If you're using [discord.js](https://discord.js.org/) you can use my own [fork](https://github.com/MatteZ02/discord.js) to receive events for interaction.

## Events

We'll cover using the 2nd option.

Replace your current discord.js with my fork `npm i https://github.com/MatteZ02/discord.js`
You can listen to the interactionCreate event which will fire every time someone uses any of the commands created for your bot.

### Usage with djs

```js
const Discord = require("discord.js");
const interactions = require("discord-interactions");

// create a new client
const client = new Discord.client();
const token = "Your unique bot token";

// attach the interaction client to discord.js client
client.interactions = new interactions.Client(token, "You bots user id");

// attach and event listener for the ready event
client.on("ready", () => {
    console.log("Client is ready!");

// Create a new command that we can test
    client.interactions.createCommand({
    name: "blep",
    description: "Send a random adorable animal photo",
    options: [
        {
            name: "animal",
            description: "The type of animal",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Dog",
                    value: "animal_dog"
                },
                {
                    name: "Cat",
                    value: "animal_dog"
                },
                {
                    name: "Penguin",
                    value: "animal_penguin"
                }
            ]
        },
        {
            name: "only_smol",
            description: "Whether to show only baby animals",
            type: 5,
            required: false
        }
    ]
}).then(console.log);
});

// attach and event listener for the interactionCreate event
client.on("interactionCreate", (interaction) => {

});

// login
client.login(token);
```

### interactione example response

```JS
channel: Discord.TextChannel;// The channel where this interaction occured
guild: Discord.Guild;// The guild where this interaction occured
member: Discord.GuildMember | null;// The guild member who issued the interaction (will be null if we cannot obtain a guildMember)
author: Discord.User | null;// The user who issued the interaction (will be null if we cannot obtain an user)
name: string;// name of this command
options: { value: string; name: string }[] | null;// list of options this user inputted to the command
```
