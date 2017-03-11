/* eslint-env node */
const { Command } = require("discord-akairo");
const config = require("./../../config.json");
     
function exec(message, args) {
    if (!args.status) return message.channel.sendEmbed(this.client.util.embed().setAuthor(`${config.prefix}status`).setDescription("Changes the bots status. Available statuses are **online, dnd, idle, and invisible**").setColor(14493733));
    this.client.user.setStatus(args.toSet);
    return message.delete().catch(e => {}); // the message getting deleted is optional so I don't want the error going to the console :eyes:
}

module.exports = new Command("status", exec, {
    aliases: ["status"]
    , args: [{
        id: "toSet"
        , type: ["online", "idle", "dnd", "invisible"]
    }]
   , ownerOnly: true
});
