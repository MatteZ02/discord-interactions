const axios = require("axios");

const apiUrl = "https://discord.com/api/v8";

class InteractionsClient {
  constructor(token, clientID) {
    if (!token) {
      console.log("discord-slash-commands-client | No token provided");
      process.exit(1);
    }
    if (!clientID) {
      console.log("discord-slash-commands-client | No clientID provided");
      process.exit(1);
    }
    this.token = token;
    this.clientID = clientID;
  }

  async getCommands(commandID, guildID) {
    if (commandID && typeof commandID !== "string")
      throw (
        "commandID received but wasn't of type string. received: " +
        typeof commandID
      );
    if (guildID && typeof guildID !== "string")
      throw (
        "guildID received but wasn't of type string. received: " +
        typeof guildID
      );
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    if (commandID) url += `/${commandID}`;

    const res = await axios
      .get(url, { headers: { Authorization: `Bot ${this.token}` } })
      .catch(console.error);
    if (!res) throw "An error has occured!";
    return res.data;
  }

  async createCommand(options, guildID) {
    if (typeof options !== "object")
      throw "options must be of type object. Received: " + typeof options;
    if (!options.name || !options.description)
      throw "options is missing name or description property!";
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    const res = await axios.post(url, options, {
      headers: { Authorization: `Bot ${this.token}` },
    });
    if (!res) throw "An error has occured!";
    return res.data;
  }

  async editCommand(options, commandID, guildID) {
    if (typeof options !== "object")
      throw "options must be of type object. Received: " + typeof options;
    if (typeof commandID !== "string")
      throw "commandID must be of type string. Received: " + typeof commandID;
    if (!options.name || !options.description)
      throw "options is missing name or description property!";
    if (guildID && typeof guildID !== "string")
      throw (
        "guildID received but wasn't of type string. received: " +
        typeof guildID
      );
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    const res = await axios
      .patch(url, options, {
        headers: { Authorization: `Bot ${this.token}` },
      })
      .catch(console.error);
    if (!res) throw "An error has occured!";
    return res.data;
  }

  async deleteCommand(commandID, guildID) {
    if (typeof commandID !== "string")
      throw "commandID must be of type string. Received: " + typeof commandID;
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    const res = await axios
      .delete(url, {
        headers: { Authorization: `Bot ${this.token}` },
      })
      .catch(console.error);
    if (!res) throw "An error has occured!";
    return res.data;
  }
}

module.exports = InteractionsClient;
