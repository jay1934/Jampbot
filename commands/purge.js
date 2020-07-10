const Discord = require("discord.js");
module.exports = {
  name: "purge",
  modOnly: true,
  guildOnly: true,
  async execute(message, args) {
    const usage = '\nCorrect usage: ``!purge number(<100)``' 

    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(
        `❌ Please provide a number between 2 and 100 for the number of messages to delete.${usage}`
      );

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.messages.fetch({
      limit: deleteCount
    });
    message.channel
      .bulkDelete(fetched)
      .catch(error =>
        message.channel.send(`❌ Couldn't delete messages because of: ${error}`)
      );
    message.channel
      .send(`✅ Succesfully deleted ${deleteCount} messages`)
      .then(message => {
        message.delete({ timeout: 2000 });
      });
  }
};
