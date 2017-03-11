/* eslint-env node */
const { Listener } = require("discord-akairo");
const Table = require("cli-table");
const config = require("./../../config.json");

function exec() {
    this.client.user.setGame(config.default_game.replace("{guildCount}", this.client.guilds.size).replace("{prefix}", config.prefix).replace("{botName}", this.client.user.username));
    let table = new Table({
        tableSize: [10, 20]
    });
    table.push(
        ["Guilds", this.client.guilds.size], ["Users", this.client.users.size], ["Prefix", config.prefix], ["Bot ID", this.client.user.id]
    );
    return console.log(table.toString());
}
                                                                                                                                 
module.exports = new Listener("ready", exec, {
    emitter: "client"
    , eventName: "ready"
    , type: "once"
});
