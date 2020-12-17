const axios = require("axios");

const apiUrl = "https://discord.com/api/v8";

class InteractionsClient {
  constructor(token, clientID) {
    if (!token) {
      console.log("Discord-interactions | No token provided");
      process.exit(1);
    }
    if (!clientID) {
      console.log("Discord-interactions | No clientID provided");
      process.exit(1);
    }
    this.token = token;
    this.clientID = clientID;
  }

  async getCommands(commandID, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    if (commandID) url += `/${commandID}`;

    try {
      const res = await axios
        .get(url, { headers: { Authorization: `Bot ${this.token}` } })
        .catch(console.error);
      return res.data;
    } catch (e) {
      throw e.data;
    }
  }

  async createCommand(options, guildID) {
    if (typeof options !== "object")
      throw "options must be of type object. Received: " + typeof options;
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    try {
      const res = await axios.post(url, options, {
        headers: { Authorization: `Bot ${this.token}` },
      });
      return res.data;
    } catch (e) {
      throw e.data;
    }
  }

  async editCommand(options, commandID, guildID) {
    if (typeof options !== "object")
      throw "options must be of type object. Received: " + typeof options;
    if (typeof commandID !== "string")
      throw "commandID must be of type string. Received: " + typeof commandID;
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    try {
      const res = await axios
        .patch(url, options, {
          headers: { Authorization: `Bot ${this.token}` },
        })
        .catch(console.error);
      return res.data;
    } catch (e) {
      throw e.data;
    }
  }

  async deleteCommand(commandID, guildID) {
    if (typeof commandID !== "string")
      throw "commandID must be of type string. Received: " + typeof commandID;
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    try {
      const res = await axios
        .delete(url, undefined, {
          headers: { Authorization: `Bot ${this.token}` },
        })
        .catch(console.error);
      return res.data;
    } catch (e) {
      throw e.data;
    }
  }
}

module.exports = InteractionsClient;
