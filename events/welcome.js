const { getChannel } = require('../utils/functions');
const config = require('../config.json');

module.exports = async (member) => {
  getChannel(config.channelID.welcome, member.client)
    .send(`Hey ${member}, welcome to **Team Jamp!** 
      
      **To gain access to the rest of the discord, please read <#699220667484078131> and agree to the message near the bottom**
      
      Have a great time and remember to contact a mod with any questions ${config.pogjamper}${config.pogjamper}${config.pogjamper}`);
};
