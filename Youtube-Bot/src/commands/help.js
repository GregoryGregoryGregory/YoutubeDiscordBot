/* eslint-env node */
const { Command } = require("discord-akairo");
const config = require("./../../config.json");

//THIS COMMAND ISN'T DONE, I KNOW THIS IS SHITTY AAAAAAAAAAA I JUST WANTED IT DONE AAAAAAA FUCK OFF AAAAAAAAAAA.
function exec(message) {
    let helpEmbed = this.client.util.embed().setAuthor(`${this.client.user.username} Command List`, this.client.user.displayAvatarURL).setThumbnail(this.client.user.displayAvatarURL).setColor(14493733);
    config.mention_prefix === true ? helpEmbed.setFooter(`You can also use a mention as the prefix.`) : null;

    function help(cmdName, cmdDesc) {
        helpEmbed.addField(config.prefix + cmdName, cmdDesc);
    }
    
    help("ping", "Gives current ping for the bot.");
    help("stats", "Gives stats for the bot.");
    help("video", "Searches Youtube for videos.");
    help("channel", "Searches Youtube for channels.");
    help("playlist", "Searches Youtube for playlists.");
    help("support", "Info on how to get support for your instance of YoutubeBot.");
    message.delete().catch(e => {}); // the message getting deleted is optional so I don't want the error going to the console :eyes:

    return message.author.sendEmbed(helpEmbed);
    
}

module.exports = new Command("help", exec, {
    aliases: ["help", "h", "commands", "cmds", "command", "cmd", "halp"]
});
