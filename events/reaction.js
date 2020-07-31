const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  // Now the message has been cached and is fully available
  if (user.bot) return;
  if (
    !reaction.message.author.bot ||
    reaction.message.channel.id !== config.channelID.notes
  )
    return;
  if (reaction.emoji.name === '👍') {
    reaction.message.embeds[0].setColor('RED');
    reaction.message.embeds[0].setFooter(
      'This note is resolved. React again to mark as unresolved'
    );
    await reaction.message.edit(
      new Discord.MessageEmbed(reaction.message.embeds[0])
    );
    await reaction.message.reactions.removeAll();
    await reaction.message.react('👎');
    await reaction.message.unpin();
  } else if (reaction.emoji.name === '👎') {
    reaction.message.embeds[0].setColor('GREEN');
    reaction.message.embeds[0].setFooter('React to mark as resolved');
    await reaction.message.edit(
      new Discord.MessageEmbed(reaction.message.embeds[0])
    );
    await reaction.message.reactions.removeAll();
    await reaction.message.react('👍');
    await reaction.message.pin();
  }
};
