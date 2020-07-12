const Discord = require('discord.js');

const prefix = '!';
// bot-spam = <#701854096965238846>
// important-links = <#701858631221772329>
// level-clears = <#701856743021609072>
// level-rules = <#699220818374295633>
// level-submissions = <#699221099199594547>
// ranks = <#699315808777797683>

module.exports = {
  name: 'faq',
  execute(message, args) {
    // these are the different embeds that will be referenced in the commands
    const registerEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('How to register in Team Jamp')
      .setDescription(
        "Before you're able to submit clears and levels, you must type ``!register nickname`` in <#701854096965238846>. Your nickname will then appear on our website under the members tab, and you're all set for the next step <a:PogJamper:704670075667611648>"
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/699939038601150510/713438819269083167/InShot_20200522_130748930.jpg'
      );

    const websiteEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle("How to login and use Team Jamp's website")
      .setDescription(
        "Links to useful pages on our website can be found in <#701858631221772329>. There you can find Team Jamp levels, worlds, leaderboard, and more. If you would like to be able to submit clears on the website, and filter through levels you've already cleared, you'll need to log in to your account. First, make sure you're registered, then use the ``!login`` command in <#701854096965238846>. Make sure you have your DMs open so the bot can send you a link to your account <a:PogJamper:704670075667611648>"
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/699230720392167482/714805202602950747/InShot_20200526_074033748.jpg'
      );

    const clearsEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('How to submit clears')
      .setDescription(
        "To submit your clears, you can either use the Team Jamp website directly or use the ``!clear xxx-xxx-xxx`` command in <#701856743021609072>. You will also get points for your clears, which will be added to your profile on the leaderboard, and can help you reach higher ranks in the discord. In Team Jamp we use point scaling, meaning you might get a higher amount of points depending on how hard the level is. It's roughly graphed like so: ``1=1, 3.5=5, 10=20``. Additionally, check the pinned message in <#701856743021609072> for extra clear-related commands <a:PogJamper:704670075667611648>"
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/699230720392167482/715284483208642580/Screenshot_20200527-152247.png'
      );

    const levelsEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('How to submit levels')
      .setDescription(
        "First, you should read <#699220818374295633> so you know what is required in a Team Jamp level. Then use the ``!add xxx-xxx-xxx level name`` command in <#699221099199594547>. Your level will then be displayed on the website as 'pending'. Once the judges review the level and hopefully approve it, you will be notified and your level will be officially welcomed into Team Jamp. Additionally, check the pinned message in <#699221099199594547> for extra level-submission-related commands <a:PogJamper:704670075667611648>"
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/699230720392167482/715289245178265740/Screenshot_20200527-154113.png'
      );

    const pendingEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('What is a pending level')
      .setDescription(
        "When somebody adds a level, it will be added to the pending queue until 3 Jamp Judges review it. They will each either cast an approve, reject, or fix vote. Note that it might take a while for your level to be reviewed, as we have a lot of levels in the queue. If you submit a clear for a pending level, you won't get any points. However, if/when the level is approved, points will automatically be distributed <a:PogJamper:704670075667611648>"
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/699230720392167482/716009530076561418/IMG_1590780366870.PNG'
      );

    // this will be referenced in a command which will show every other FAQ command for ease of navigation
    const menuEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('FAQ Command Menu')
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/699230720392167482/715303228383690853/1588435006903.png'
      )
      .addField('__**faq 1 / faq register**__', 'How to register in Team Jamp')
      .addField(
        '__**faq 2 / faq website**__',
        "How to login and use Team Jamp's website"
      )
      .addField('__**faq 3 / faq clears**__', 'How to submit clears')
      .addField('__**faq 4 / faq levels**__', 'How to submit levels')
      .addField('__**faq 5 / faq pending**__', 'What are pending levels');

    // if there is nothing after !faq, cancel the command and return an error message
    if (!args[0])
      return message.channel.send(
        '❌ Please input a number or keyword to reference a specific FAQ. To find all FAQ commands, use ``!faq menu`` or check the FAQ channel'
      );

    const msg = message.content.toLowerCase();
    // if someone send a message !faq 1, then send the faq 1 embed. If someones send a message !faq 2, send the faq 2 embed, etc.

    if (msg.includes('!faq 1' || '!faq register'))
      return message.channel.send(registerEmbed);
    if (msg.includes('!faq 2' || 'faq website'))
      return message.channel.send(websiteEmbed);
    if (msg.includes('faq 3' || '!faq clears'))
      return message.channel.send(clearsEmbed);
    if (msg.includes('!faq 4' || '!faq levels'))
      return message.channel.send(levelsEmbed);
    if (msg.includes('faq 5' || '!faq pending'))
      return message.channel.send(pendingEmbed);
    if (msg.includes('!faq menu')) return message.channel.send(menuEmbed);
    if (msg.includes('!faq pin'))
      return message.channel.send('<a:pin:717834744523522139>');
    // if none of these apply, cancel the command and send an error message
    message.channel.send(
      '❌ Please input a valid argument. Proper usage is: ``!faq <number or keyword>``. To find all FAQ commands, use ``!faq menu`` or check the FAQ channel'
    );
  },
};
