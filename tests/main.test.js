console.log("Running tests");

const interactions = require("../src/index");

const client = new interactions("NjA3ODEzODY3MTI0NTU1Nzk3.XUfExg.TqdaPL-WG02zas19cLI6ugWcD6k", "607813867124555797");

client.getCommands().then(res => console.log(res))