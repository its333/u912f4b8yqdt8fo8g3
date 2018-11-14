
const Discord = require("discord.js")
const { get } = require('snekfetch');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  if(args.length < 2){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "hasgamepass {userid} {gamepass id}", true));
    return;
  };

  const res = await get(`https://inventory.roblox.com/v1/users/${args[0]}/items/GamePass/${args[1]}`).catch(() => null);
  if (!res || !res.body) return message.reply('Error occured');
  return message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Ownership", Object.keys(res.body.data).length == 1, true));
}

module.exports.haspass = async(user,gamepass) => {
  const res = await get(`https://inventory.roblox.com/v1/users/${user}/items/GamePass/${gamepass}`).catch(() => null);
  if (!res || !res.body) return null
  return Object.keys(res.body.data).length == 1
}

module.exports.help = {
  name: "hasgamepass"
}
