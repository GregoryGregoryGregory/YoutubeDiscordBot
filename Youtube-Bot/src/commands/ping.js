/* eslint-env node */
const { Command } = require("discord-akairo");

function exec(message){
    return message.channel.sendMessage("Pong!").then(msg => msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`));
}

module.exports = new Command("ping", exec, {
    aliases: ["ping"]
});
