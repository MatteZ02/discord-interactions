const Discord = require("discord.js");
const interactions = require("../src/index");

// create a new client
const client = new Discord.Client();
const token = "";

// attach the interaction client to discord.js client
client.interactions = new interactions.Client(token, "");

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
}, "489111553321336832").then(console.log);
});

// attach and event listener for the interactionCreate event
client.on("interactionCreate", (interaction) => {
    console.log(interaction)
});

// login
client.login(token);