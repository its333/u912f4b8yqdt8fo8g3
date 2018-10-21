
const Discord = require("discord.js")
const { get } = require('snekfetch');

async function getDog() {
	const dog = await get('https://random.dog/woof');
	//if (!dog.text.endsWith('png') && !dog.text.endsWith('jpg')) return await getDog();
	return `http://random.dog/${dog.text}`;
}

module.exports.run = async (bot, message, args) => {
  const dog = await getDog();
  if (!dog) return message.reply('There was en error, please try again.');
  return message.channel.send({
      embed:
      {
          footer: { text: `Requested by ${message.author.tag}`, icon_url: message.author.displayAvatarURL },
          image: { url: dog }
      }
  });
}

module.exports.help = {
  name: "dog"
}
