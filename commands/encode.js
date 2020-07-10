module.exports = {
  name: "encode",
  aliases: ["decode"],
  blacklist: true,
  async execute(message, args) {
    const usage = "\nCorrect usage: ``![en/de]code text``";
    let str = args.slice(0).join(" ");
    if (!str)
      return message.channel.send(
        `❌ You did not give a string to convert.${usage}`
      );
    if (message.content.includes("encode")) {
      var spaceSeparatedOctets;
      function stringToBinary(str, spaceSeparatedOctets) {
        function zeroPad(num) {
          return "00000000".slice(String(num).length) + num;
        }

        return str.replace(/[\s\S]/g, function(str) {
          str = zeroPad(str.charCodeAt().toString(2));
          return !1 == spaceSeparatedOctets ? str : str + " ";
        });
      }
      const yes = stringToBinary(str, spaceSeparatedOctets)
      
      if (yes.length > 2000) {
        message.channel.send('Your message is too long; the corresponding binary exceeds Discord\'s character limit')
      }
      message.channel.send(yes);
    }
    if (message.content.includes("decode")) {
      function binaryToString(str) {
        if (str.includes('01000000 01100101 01110110 01100101 01110010 01111001 01101111 01101110 01100101') 
          || str.includes('01011100 01000000 01100101 01110110 01100101 01110010 01111001 01101111 01101110 01100101')
            || str.includes('00110110 00110100 00110010 00110100 00110100 00110111 00110011 00110100 00110100 00110000 00110101 00110000 00110011 00110111 00110010 00110110 00110000 00111000'))
        return message.channel.send('<:polite:699433623962648576>')
        // Removes the spaces from the binary string
        str = str.replace(/\s+/g, "");
        // Pretty (correct) print binary (add a space every 8 characters)
        str = str.match(/.{1,8}/g).join(" ");

        var newBinary = str.split(" ");
        var binaryCode = [];

        for (var i = 0; i < newBinary.length; i++) {
          binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
        }

        return binaryCode.join("");
      }
      const no = binaryToString(str)
      
      message.channel.send(binaryToString(str));
    }
  }
};
