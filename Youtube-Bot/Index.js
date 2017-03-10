/* eslint-env node */
const { AkairoClient } = require("discord-akairo");
const config = require("./config.json");

const client = new AkairoClient({
    ownerID: config.owner_id,
    prefix: config.prefix,
    allowMention: config.mention_prefix,
    commandDirectory: "./Youtube-Bot/src/commands/",
    listenerDirectory: "./Youtube-Bot/src/listeners/"
});

client.login(config.token).catch(e => console.log("Invalid OAauth2 token."))
