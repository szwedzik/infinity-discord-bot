const { loadCommands } = require("../../Handlers/commandHandler");
const mongoose = require("mongoose");
const config = require("../../config.json");

const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Logged in as: ${green}${client.user.tag}${reset}`);

        if(!config.Database) return;
        mongoose.connect(config.Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`${green}Database connection has been established.${reset}`);
        }).catch((err) => {
            console.log(`Database Error: ${red}` + err + `${reset}`);
        });

        loadCommands(client);
    }
}