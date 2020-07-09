const Discord = require ('discord.js')
module.exports = {
  name: "closeticket",
  modOnly: true,
  guildOnly: true,
  async execute(message, args) {
    if (!message.channel.name.includes('user-report-') || message.channel.parentID != '727561183921569832' || !message.channel.topic.includes('Creator ID: ')) return message.channel.send('This channel is not a ``ticket``')
    let reason = args.slice(0).join(" ");
    const creator = message.channel.topic.slice(12)
    const closed = new Discord.MessageEmbed()
    .setTitle('Your ticket has been closed')
    .setColor('GREEN')
    .setDescription('Thank you for submitting a report and helping us make Team Jamp a better place!')
    .setFooter('Please contact a moderator or submit another report with any further questions or concerns');
    if(reason) {
      closed.addField("Closing Message", reason, true)
    }
               
    await message.client.users.cache.get(creator).send(closed);
    await message.channel.delete()
  }}