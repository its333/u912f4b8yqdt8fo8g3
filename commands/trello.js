
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

var Trello = require("trello");
var t = new Trello("23b7152794719f1c6c9a126a0610a8c0",
"186134a00a02002554a03e0d73074ef5af0a3ea167f37413458af916079d768d");

const listId = "5b5cdebf72729ed765b2abd3";

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "trello {username}", true));

    return;
  };

  var userName = args[0];

  rbx.getIdFromUsername(userName)
  .catch(function(err){
    console.error(err.stack);
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Error", "failed to find player", true));

    throw new Error('abort promise chain');
  })
  .then(function (userId){
    t.addCard(`${userName}:${userId}`,"created via discord bot",listId,
    function (error, trelloCard) {
      if (error) {
          console.log('Could not add card:', error);
          throw new Error('abort promise chain');
      }
      else {
          console.log('Added card:', trelloCard);
      }
    })
  })
  .then(function (){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Completed", "Sucessfully given permit", true));

  });

}

module.exports.help = {
  name: "trello"
}
