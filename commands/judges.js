module.exports = {
  name: 'judges',
  guildOnly: true,
  rolePermission: 'Jamp Judge',
  async execute(message, args) {
    message.channel.send(
      "Please be patient and realize that the judge team are real people with real lives that take precedent over getting your level approved. This is not our job, it is a hobby. Please don't make it feel like more work than it should.\n\nWe try to get 3 votes on each submission, which can take some time, especially on the more difficult levels.\n\nThank You,\nThe Jamp Judge team"
    );
  },
};
