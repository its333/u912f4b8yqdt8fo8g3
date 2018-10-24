
const Discord = require("discord.js")
const rbx = require('noblox.js');

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.roles.find('name','Head Developer')){message.reply("no permission"); return;}; //require premission

  if(args.length < 3){
    message.channel.send("Error changing rank");
    return;
  };

  var options = {
    group: args[0],
    target: args[1],
    rank: parseInt(args[2])
  }

  rbx.setRank(options)
  .then(function (newRole) {
    console.log('The new role is: ' + JSON.stringify(newRole))
    message.channel.send("Changed role to " + JSON.stringify(newRole));
  });

}

module.exports.help = {
  name: "setrank"
}
