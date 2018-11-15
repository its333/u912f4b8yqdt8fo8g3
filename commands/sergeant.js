
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "commander {username}", true));
    return;
  };

  var groupId = 4308355;
  var setRank = 6;
  var gamepassId = 4888267;

  var userName = args[0];

  var joinOptions = {
    group: groupId,
    username: userName,
    accept: true
  }

  let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

  rbx.getIdFromUsername(userName)
  .then(function(userId){

    require("./hasGamepass.js").haspass(userId,gamepassId) //own gamepass
    .then(function(haspass){

      if(!haspass){
        message.channel.send(new Discord.RichEmbed()
        .setColor(randomColor())
        .addField("Failed", "you dont own gamepass", true));
        throw new Error('abort promise chain'); //break chain
      }

      rbx.setRank({
        group: groupId,
        target: userId,
        rank: setRank
      })
      .then(function (newRole) {
        message.channel.send(new Discord.RichEmbed()
        .setColor(randomColor())
        .addField("Completed", "sucessfully ranked", true));
      })
      .catch(function(err){
        console.error(err.stack);
        message.channel.send(new Discord.RichEmbed()
        .setColor(randomColor())
        .addField("Error", "failed to rank", true));

        throw new Error('abort promise chain');
      })

    })

  });

}

module.exports.help = {
  name: "sergeant",
  anyone: true,
}
