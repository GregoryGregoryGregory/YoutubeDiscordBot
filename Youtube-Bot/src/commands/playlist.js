/* eslint-env node */
const { Command } = require("discord-akairo");
const request = require("request-promise-native");
const config = require("./../../config.json");

function exec(message, args) {
    if (!args.content) return message.channel.sendEmbed(this.client.util.embed().setAuthor(`${config.prefix}playlist`).setDescription("Searches Youtube for playlists.").setColor(14493733));
    request(`https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(args.content)}&type=playlist&part=snippet&key=${config.api_token}`).then(p => {
        let playlist = JSON.parse(p);
        if (playlist.pageInfo.totalResults === 0) return message.channel.sendEmbed(this.client.util.embed().setAuthor("\u00AF\\\_(\u30C4)_\/\u00AF").setDescription(`I couldn't find any playlists matching *${args.content}*`).setColor(14493733));
        request(`https://www.googleapis.com/youtube/v3/playlists?id=${playlist.items[0].id.playlistId}&part=contentDetails&key=${config.api_token}`).then(pInfo => {
            let playlistInfo = JSON.parse(pInfo);
            let playlistEmbed = this.client.util.embed();
            playlistEmbed.setAuthor(playlist.items[0].snippet.channelTitle)
                .setTitle(playlist.items[0].snippet.title)
                .setURL(`https://www.youtube.com/playlist?list=${playlist.items[0].id.playlistId}`);
            playlist.items[0].snippet.description ? playlistEmbed.setDescription(playlist.items[0].snippet.description) : null;
            playlistEmbed.setColor(14493733)
                .setImage(playlist.items[0].snippet.thumbnails.high.url)
                .addField("Videos", playlistInfo.items[0].contentDetails.itemCount, true)
            return message.channel.sendEmbed(playlistEmbed);
        });
    });
}

module.exports = new Command("playlist", exec, {
    aliases: ["playlist", "playlists", "plist", "plists", "p"]
    , args: [{
        id: "content"
        , match: "content"
    }]
    , channelRestriction: "guild"
});
