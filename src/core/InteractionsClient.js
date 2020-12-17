const axios = require("axios");

const apiUrl = "https://discord.com/api/v8";

class InteractionsClient {
  constructor(token, clientID) {
    this.token = token;
    this.clientID = clientID;
  }

  async getCommands(commandID, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    if (commandID) url += `/${commandID}`;
    return await axios.get(url, undefined, { headers: `Bot ${this.token}` });
  }

  async createCommand(options, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    return await axios.post(url, options, { headers: `Bot ${this.token}` });
  }

  async editCommand(options, commandID, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    return await axios.patch(url, options, { headers: `Bot ${this.token}` });
  }

  async deleteCommand(commandID, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
      : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

    return await axios.delete(url, undefined, { headers: `Bot ${this.token}` });
  }
}

module.exports = InteractionsClient;
