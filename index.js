const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {

  if(err) console.log(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js")
  if(jsfiles.length <= 0){
    console.log("no commands");
    return;
  }

  jsfiles.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log(`Loaded ${f}`);
    bot.commands.set(props.help.name,props);
  });


})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("patreon.com/papane", {type: "DONATE"});
  
  require("./commands/login.js").run(bot,null); //log bot in
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd.slice(0,1) != prefix) return;

  let commandfile = bot.commands.get(cmd.slice(prefix.length)); //find command
  if(commandfile){
    //check channel
    var patreonChannel = message.guild.channels.find("name","patreon")
    var generalChannel = message.guild.channels.find("name","general")
    if(message.channel != patreonChannel && message.channel != generalChannel) return;

    if(!message.member.roles.find('name','Raddleton Patreon')){message.reply("no permission"); return;}; //require premission
    commandfile.run(bot, message, args); //run command
  }


});

bot.login(process.env.token); //token
