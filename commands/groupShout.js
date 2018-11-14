
const Discord = require("discord.js")
const rbx = require('noblox.js');
const randomColor = require('randomcolor'); // import the script

var groups = [4308364,
4433455,
4314229,
4314224,
4311787,
4311117,
4308355];

module.exports.run = async (bot, message, args) => {
  groups.forEach(function(id){
      let onShout = rbx.onShout(id);

      let gName = null;
      let gLogo = null;

      rbx.getName(id)
      .then(function(name){
        gName = name;
      })
      .then(function(){
        rbx.getLogo(id)
        .then(function(logo){
          gLogo = logo;
        })
        .then(function(){
          onShout.on('data', function(post) {
            //sender,subject,body,created,updated,read,parent,id
            const embed = new Discord.RichEmbed()
            .setTitle(gName)
            .setAuthor(post.author.name,
            `http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=${post.author.name}`)
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor(randomColor())
            .setDescription(post.message)
            .setFooter("Group Shout", "http://i.imgur.com/w1vhFSR.png")
            .setThumbnail(gLogo)
            /*
             * Takes a Date object, defaults to current date.
             */
            .setTimestamp()
            .setURL(`http://www.roblox.com/groups/group.aspx?gid=${id}`)
            .addBlankField(true);

            var guilds = bot.guilds; //all the server the bot is in
            try {
                guilds.map((guild) => {
                  var c = guild.channels.find("name","group-shout");
                  if(c)
                  c.send({embed}); //send in channel
                });
            } catch (err) {
                console.log("shout failed");
            }

          });
        });

        onShout.on('error', function (err) {
            console.error(err.stack);
        });
    });
  })
}

module.exports.help = {
  name: "ongroupshout"
}
