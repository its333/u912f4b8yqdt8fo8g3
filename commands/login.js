
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  var jar = rbx.jar(); //make a new jar
  rbx.login(process.env.user1, process.env.pass1, jar) //log the jar in
  .then(function(){
    console.log(jar); //print to make sure jar created
    return jar; //return the jar
  })
  .then(function(){ //RCPD
    var onJoinRCPD = rbx.onJoinRequestHandle(4308355,jar) //group id, jar
    onJoinRCPD.on('data', function (request) { //on join request
      rbx.getIdFromUsername(request.username).then(function (id) { //get their id

        rbx.getPlayerInfo(id) //get their info using the id
        .then(function(info){
          if (info.age < 30) { //reject their request if their account is under 30 days old
            onJoinRCPD.emit('handle', request, null, function(){ //reject request
              console.log(`RCPD request ignored: username ${request.username} id ${id} age ${info.age}`);
            });
          } else { //if older than 30 days then accept request
            onJoinRCPD.emit('handle', request, true, function(){ //accept request
              console.log(`RCPD request accepted: username ${request.username} id ${id} age ${info.age}`);
            });
          };
        });

      });
    });
  })

  .then(function(){ //COR
    var onJoinCOR = rbx.onJoinRequestHandle(4308364,jar) //group id, jar
    onJoinCOR.on('data', function (request) { //on join request
      rbx.getIdFromUsername(request.username).then(function (id) { //get their id

        rbx.getPlayerInfo(id) //get their info using the id
        .then(function(info){
          if (info.age < 30) { //reject their request if their account is under 30 days old
            onJoinCOR.emit('handle', request, null, function(){ //reject request
              console.log(`COR request ignored: username ${request.username} id ${id} age ${info.age}`);
            });
          } else { //if older than 30 days then accept request
            onJoinCOR.emit('handle', request, true, function(){ //accept request
              console.log(`COR request accepted: username ${request.username} id ${id} age ${info.age}`);
            });
          };
        });

      });
    });
  });

  rbx.login(process.env.user2, process.env.pass2)
  .then(function () {
    console.log('Logged in')

    if (message)
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Completed", "Sucessfully logged in", true));

    //On message
    var onMessage = rbx.onMessage();
    onMessage.on('data', function(newMessage){
      //sender,subject,body,created,updated,read,parent,id

      const embed = new Discord.RichEmbed()
      .setTitle(newMessage.subject)
      .setAuthor(newMessage.sender.name, `http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=${newMessage.sender.name}`)
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setDescription(newMessage.body)
      .setFooter("Roblox message", "http://i.imgur.com/w1vhFSR.png")
      .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=${newMessage.sender.name}`)
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .setURL("https://roblox.com")
      .addBlankField(true);

      var guildList = bot.guilds.array(); //all the server the bot is in
      try {
          guildList.forEach(guild => guild.channels.find("name","general").send({embed})); //send in general
      } catch (err) {
          console.log("Could not send message to " + guild.name);
      }

      //bot.channels.find("name","general").send({embed}); this only send in one server

    });
  })
  .catch(function (err) {
    console.error(err.stack);

    if(message)
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Error", "failed to log in", true));
  });

}

module.exports.help = {
  name: "beebee"
}
