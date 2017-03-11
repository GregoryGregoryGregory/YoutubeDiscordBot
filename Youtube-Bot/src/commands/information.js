/* eslint-env node */
const { Command } = require("discord-akairo");
const config = require("./../../config.json");

function exec(message) {
    let infoMsg = `I am ${this.client.user.username}, a selfhosted instance of [YoutubeBot](https://github.com/GregoryGregoryGregory/YoutubeDiscordBot) by Greg#5821. If you would like to host your own YoutubeBot, check out the [docs](about:blank). To get a list of commands for this instance, do ${config.prefix}help`;
    config.mention_prefix === true ? infoMsg += ", or you can use a mention as the prefix." : infoMsg += ".";
    return message.channel.sendEmbed(this.client.util.embed().setAuthor(`Hello! I am ${this.client.user.username}`).setColor(14493733).setDescription(infoMsg));
}

module.exports = new Command("information", exec, {
    aliases: ["info", "youtube", "yt", "information"]
});
