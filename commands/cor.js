
const Discord = require("discord.js")
const rbx = require('noblox.js');

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send("Usage: !cor {username}");
    return;
  };

  var groupId = 4308364;
  var setRank = 3;
  
  var userName = args[0];

  var joinOptions = {
    group: groupId,
    username: userName,
    accept: true
  }

  let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

  rbx.getIdFromUsername(userName)
  .then(function(userId){
    rbx.setRank({
      group: groupId,
      target: userId,
      rank: setRank
    })
    .then(function (newRole) {
      message.channel.send('sucessfully ranked');
    })
    .catch(function(err){
      console.error(err.stack);
      message.channel.send('error occured at changing rank ' + userId);
      throw new Error('abort promise chain');
    })

  });

}

module.exports.help = {
  name: "cor"
}
