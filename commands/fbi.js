
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "fbi {username}", true));

    return;
  };

  var groupId = 4314229;
  var setRank = 2;

  var userName = args[0];

  var joinOptions = {
    group: groupId,
    username: userName,
    accept: true
  }

  let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

  rbx.handleJoinRequest(joinOptions)
  .catch(function(err){
    console.error(err.stack);
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Error", "failed to handle request", true));

    throw new Error('abort promise chain');
  })
  .then(function (){
    rbx.getIdFromUsername(userName)

    .then(function(userId){
      rbx.setRank({
        group: groupId,
        target: userId,
        rank: setRank
      })
      .then(function (newRole) {
        message.channel.send(new Discord.RichEmbed()
        .setColor(randomColor())
        .addField("Completed", "Sucessfully handled request", true));

      })
      .catch(function(err){
        console.error(err.stack);
        message.channel.send(new Discord.RichEmbed()
        .setColor(randomColor())
        .addField("Error", "failed to handle request" + userId, true));

        throw new Error('abort promise chain'); //drop stack
      })
    })

  });

}

module.exports.help = {
  name: "fbi"
}
