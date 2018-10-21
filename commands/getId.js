
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

const embedUsage = new Discord.RichEmbed()
.setColor(randomColor())
.addField("Usage", "getid {username}", true);

  if(args.length < 1){
    message.channel.send(embedUsage);
    return;
  };

  var options = {
    username: args[0],
  }

  rbx.getIdFromUsername(args[0])
  .catch(function (e) {
    console.log(e);
    const embed = new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Error", "Error getting id", true);
    message.channel.send(embed);
  })
  .then(function (id) {
    if(!id)return;
    console.log(`userId: ${id}`);
    const embed = new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("UserId", `${id}`, true);
    message.channel.send(embed);
  });

}

module.exports.help = {
  name: "getid"
}
