const Discord = require('discord.js');

module.exports = {
  name: 'purge',
  rolePermission: 'Jampolice',
  guildOnly: true,
  category: 'moderation',
  usage: '!purge <number>',
  description: 'Bulk-deletes a number of messages',
  async execute(message, args) {
    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(
        `❌ Please provide a number between 2 and 100 for the number of messages to delete.\nCorrect usage: \`\`${this.usage}\`\`\``
      );

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount,
    });
    message.channel
      .bulkDelete(fetched)
      .catch((error) =>
        message.channel.send(`❌ Couldn't delete messages because of: ${error}`)
      );
    message.channel
      .send(`✅ Successfully deleted ${deleteCount} messages`)
      .then((message) => {
        message.delete({ timeout: 2000 });
      });
  },
};
