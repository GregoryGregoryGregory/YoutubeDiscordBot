/* eslint-env node */
const { Command } = require("discord-akairo");
const request = require("request-promise-native");
const config = require("./../../config.json");
           
function exec(message, args) {
    if (!args.content) return message.channel.sendEmbed(this.client.util.embed().setAuthor(`${config.prefix}channel`).setDescription("Searches Youtube for channels.").setColor(14493733));
    request(`https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(args.content)}&type=channel&part=snippet&key=${config.api_token}`).then(c => {
        let channel = JSON.parse(c);
        if (channel.pageInfo.totalResults === 0) return message.channel.sendEmbed(this.client.util.embed().setAuthor("\u00AF\\\_(\u30C4)_\/\u00AF").setDescription(`I couldn't find any videos matching *${args.content}*`).setColor(14493733));
        request(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel.items[0].id.channelId}}&key=${config.api_token}`).then(cInfo => {
            let channelInfo = JSON.parse(cInfo);
            let channelEmbed = this.client.util.embed();
            channelEmbed.setAuthor(channel.items[0].snippet.title);
            channel.items[0].snippet.description ? channelEmbed.setDescription(channel.items[0].snippet.description) : null;
            channelEmbed.setURL(`https://www.youtube.com/channel/${channel.items[0].id.channelId}`);
            channelEmbed.setColor(14493733);
            channel.items[0].snippet.thumbnails.high.url ? channelEmbed.setThumbnail(channel.items[0].snippet.thumbnails.high.url) : null;
            channelEmbed.addField("Subscribers", parseInt(channelInfo.items[0].statistics.subscriberCount, 10, 10).toLocaleString(), true);
            channelEmbed.addField("Videos", parseInt(channelInfo.items[0].statistics.videoCount, 10, 10).toLocaleString(), true);
            return message.channel.sendEmbed(channelEmbed);
        });
    });
}

module.exports = new Command("channel", exec, {
    aliases: ["channel", "channels", "chan", "chans", "c"]
    , args: [{
        id: "content"
        , match: "content"
    }]
    , channelRestriction: "guild" // I forgot this on everything else, shit
});
