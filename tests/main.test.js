const Discord = require("discord.js");
const interactions = require("../src/index");

// create a new client
const client = new Discord.Client();
const token = "NzE0ODEwNTkyNTg5OTA1OTIy.Xs0FPQ.TgCDJpjUwGv_3dVLAVWk0zS_gew";

// attach the interaction client to discord.js client
client.interactions = new interactions.Client(token, "714810592589905922");

// attach and event listener for the ready event
client.on("ready", () => {
  console.log("Client is ready!");

  // Create a new command that we can test
  client.interactions.createCommand().catch(console.error).then(console.log);
});

// attach and event listener for the interactionCreate event
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
});

// login
client.login(token);
