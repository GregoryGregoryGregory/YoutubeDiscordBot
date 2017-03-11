/* eslint-env node */
const { Command } = require("discord-akairo");
const request = require("request-promise-native");
const config = require("./../../config.json");
           
function exec(message, args) {
    if (!args.content) return message.channel.sendEmbed(this.client.util.embed().setAuthor(`${config.prefix}video`).setDescription("Searches Youtube for videos.").setColor(14493733));
    request(`https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(args.content)}&type=video&part=snippet&key=${config.api_token}`).then(v => {
        let video = JSON.parse(v);
        if (video.pageInfo.totalResults === 0) return message.channel.sendEmbed(this.client.util.embed().setAuthor("\u00AF\\\_(\u30C4)_\/\u00AF").setDescription(`I couldn't find any videos matching *${args.content}*`).setColor(14493733));
        request(`https://www.googleapis.com/youtube/v3/videos?id=${video.items[0].id.videoId}&part=contentDetails&key=${config.api_token}`).then(vInfo => {
            let videoInfo = JSON.parse(vInfo);
            let videoEmbed = this.client.util.embed();
            videoEmbed.setAuthor(video.items[0].snippet.channelTitle)
                .setTitle(video.items[0].snippet.title)
                .setURL(`https://www.youtube.com/watch?v=${video.items[0].id.videoId}`);
            video.items[0].snippet.description ? videoEmbed.setDescription(video.items[0].snippet.description) : null;
            videoEmbed.setColor(14493733)
                .setThumbnail(`https://i.ytimg.com/vi/${video.items[0].id.videoId}/mqdefault.jpg`)
                .addField("Captions?", videoInfo.items[0].contentDetails.caption.toString().replace("true", "Yes").replace("false", "No"), true)
                .addField("Duration", videoInfo.items[0].contentDetails.duration.toString().replace(/["PT", "S"]/g, "").replace("H", ":").replace("M", ":"), true);
            return message.channel.sendEmbed(videoEmbed);
        });
    });
}

module.exports = new Command("video", exec, {
    aliases: ["video", "videos", "vid", "vids", "v"]
    , args: [{
        id: "content"
        , match: "content"
    }]
    , channelRestriction: "guild"
});
