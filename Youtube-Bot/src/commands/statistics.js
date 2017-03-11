/* eslint-env node */
const { Command } = require("discord-akairo");
const config = require("./../../config.json");

function exec(message) {
     let statsEmbed = this.client.util.embed()
        .setColor(14493733)
        .setAuthor(`${this.client.user.username} statistics`, this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
        .setDescription(`I was created ${this.client.user.createdAt.toString().substr(0, 15)}!`)
        .addField("Guilds", this.client.guilds.size.toLocaleString(), true)
        .addField("Users", this.client.users.size.toLocaleString(), true)
        .addField("Channels", this.client.channels.size.toLocaleString(), true)
        .addField("Prefix", config.prefix, true)
        .addField("Memory Usage", `${Math.floor(process.memoryUsage().rss / 10485.76) / 100} MB`, true)
        .addField("Library", `Discord.js ${require("discord.js").version}`, true)
        return message.channel.sendEmbed(statsEmbed);
}

module.exports = new Command("stats", exec, {
    aliases: ["stats", "statistics", "botstats"]
});
