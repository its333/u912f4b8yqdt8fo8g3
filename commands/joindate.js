
const Discord = require("discord.js")
const randomColor = require('randomcolor'); // import the script
const { get } = require('snekfetch');
const cheerio = require('cheerio');

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "joindate {userid}", true));
    return;
  };
  let id = args[0];
  let stats = await get(`https://www.roblox.com/users/${id}/profile`)
  .then(res => cheerio.load(res.body)('.profile-statistics').text()).catch(() => null);

	if (!stats) return message.reply('something went wrong when fetching statistics for this profile.');
	stats = stats.match(/Date([\d/]+)/);
  message.channel.send(new Discord.RichEmbed()
  .setColor(randomColor())
  .addField("Join Date", stats[1], true));
}

module.exports.help = {
  name: "joindate"
}
