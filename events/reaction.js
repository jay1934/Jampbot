module.exports = async (reaction, { bot }) => {
  const { message, fetch, emoji } = reaction;
  if (reaction.partial) await fetch.call(reaction);
  if (bot || !message.author.bot || message.channel.id !== '731248690550800406')
    return;
  if (emoji.name === '👍') {
    message.edit({
      embed: {
        ...message.embeds[0],
        color: 15158332,
        footer: {
          text: 'This note is resolved. React again to mark as unresolved',
        },
      },
    });
    await message.reactions.removeAll();
    message.react('👎');
    message.unpin();
  } else if (emoji.name === '👎') {
    message.edit({
      embed: {
        ...message.embeds[0],
        color: 3066993,
        footer: 'React to mark as resolved',
      },
    });
    await message.reactions.removeAll();
    message.react('👍');
    message.pin();
  }
};
