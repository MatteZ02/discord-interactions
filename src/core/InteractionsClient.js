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
    
    try {
      const res = await axios
        .get(url, { headers: { Authorization: `Bot ${this.token}` } })
        .catch(console.error);
      return res.data;
    } catch (e) {
      throw new Error(e.data);
    }
  }

  async createCommand(options, guildID) {
    const url = guildID
      ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
      : `${apiUrl}/applications/${this.clientID}/commands`;

    try {
      const res = await axios.post(url, options, {
        headers: { Authorization: `Bot ${this.token}` },
      });
      return res.data;
    } catch (e) {
      throw new Error(e.data);
    }
  }

  async editCommand(options, commandID, guildID) {
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
      throw new Error(e.data);
    }
  }

  async deleteCommand(commandID, guildID) {
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
      throw new Error(e.data);
    }
  }
}

module.exports = InteractionsClient;
