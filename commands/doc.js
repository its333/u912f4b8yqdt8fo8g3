
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "doc {username}", true));

    return;
  };

  var Options = {
    group: 4433455,
    username: args[0],
    accept: true
  }

  rbx.handleJoinRequest(Options)
  .catch(function(err){
    console.error(err.stack);
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Error", "failed to handle request", true));

    throw new Error('abort promise chain');
  })
  .then(function (){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Completed", "Sucessfully handled request", true));

  });

}

module.exports.help = {
  name: "doc"
}
