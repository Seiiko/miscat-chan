// SETUP THE BOT
const Discord = require('discord.js');
const client = new Discord.Client();

// SETUP THE DEPENDENCIES
const catFacts = require('cat-facts');
const dogFacts = require('dog-facts');
const randomPuppy = require('random-puppy');
const motivQuotes = require('motivational-quotes');

// DEFINE THE NECESSARY VARIABLES
var comOn = false; // Switch varible for the .day command.

// DEFINE THE PREFIX
const prefix = ".";

// SET BOT STATUS
client.on('ready', () => { // When the bot is ready.
    client.user.setPresence({ game: { name: 'Miscat\'s videos', type: 0 } }); // Set the bot's status.
});
    
// WELCOMING NEW MEMBERS
client.on("guildMemberAdd", member => { // Listener event: user joining the server.
    
  // Defining the variables.
  const welcomeChannel = client.channels.find("name", "general-chat") // Create a variable referring to the selected channel.
  const embedCommands = new Discord.RichEmbed() // Create a constant referring to the embed message.

    .setTitle("Check out what the Miscat Squad has to offer!")
    .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

    .setColor("#95dbdb")
    .setDescription("For help with a specific command, type \".help [command]\".")

    .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

    .setURL("https://www.youtube.com/c/miscatsquad")

    .addField("Regular Commands",
    ".help  |  .info  |  .katseries  |  .ping  |  .report  |  .suggestion")

    .addField("Fun Commands",
    ".catfact  |  .coinflip  |  .dieroll  |  .dogfact  |  .katgif  |  .motiv  |  .potato  |  .puppy  |  .rate  |  .seisfave")

    .addField("Admin Commands", ".ban  |  .kat  |  .kick  |  .mute  |  .purge  |  .say  |  .unmute", true)
    .addField("Bot Owner Commands", ".avatar  |  .nick  |  .status  |  .test  |  .utag", true)

  // Sending the messages.
  welcomeChannel.send("<@!"+member.user.id+"> || **Fistbump! Welcome to the squad!** \nBe sure to introduce yourself in the #miscat-squad-introductions channel to get the fun started! And if you need help the #support-group is opened to you 24/7! Make yourself at home and embrace your inner fangirl and fanboy every single day!");
  member.send("**Fistbump! Welcome to the squad!** \nBe sure to introduce yourself in the #miscat-squad-introductions channel to get the fun started! And if you need help the #support-group is opened to you 24/7! Make yourself at home and embrace your inner fangirl and fanboy every single day!");
  member.send(":white_check_mark: | Here's a list of all the commands of the bot! Write \".help [command name]\" to get specific help with that command.");
  member.send(embedCommands);
    
});

// BOT OWNER COMMANDS
client.on("message", async message => { // Message handler event. 
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.

  // NICK COMMAND
  if(command === "nick") { // Check if the command is .nick.
      
    // Limit it to the bot owner.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .nick command!"); // Send message to the channel.
    
    // Get the nickname. 
    const newNickname = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Change the bot's nickname.
    message.guild.members.get(client.user.id).setNickname(newNickname);
      
  }

  // AVATAR COMMAND
  if (command === "avatar") { // Check if the command is .avatar
    
    // Limit it to the bot owner.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .avatar command!"); // Send message to the channel.
    
    // Get the avatar. 
    const newAvatar = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Change the bot's avatar.
    message.guild.members.get(client.user.id).setAvatar(newAvatar);
  
  }

  // UTAG COMMAND
  if (command === "utag") { // Check if the command is .utag.
  
    // Limit it to the bot owner.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .utag command!"); // Send message to the channel.
    
    // Get the user tag. 
    const newTag = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Change the bot's user tag.
    client.user.setUsername(newTag);

  }

  // STATUS COMMAND
  if (command === "status") { // Check if the command is .status.

    // Limit it to the bot owner.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .status command!"); // Send message to the channel.
    
    // Get the status. 
    const newStatus = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Change the bot's status.
    client.user.setPresence({ game: { name: newStatus, type: 0 } }); // Set the bot's status.

  }

  // TEST COMMAND
  if (command === "test") { // Check if the command is .test.
  
    // Limit it to the bot owner.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .test command!"); // Send message to the channel.
  
    if (args == 1){
      message.channel.send("This'd be a number.")
    } else if (args == 2) {
      message.channel.send("Keyword and number.")
    } else {
      message.channel.send("Invalid format.")
    }

  }

});

// ADMIN COMMANDS
client.on("message", async message => { // Message handler event.
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.

  // KAT COMMAND
  if(command === "kat"){ // Check if the command is .kat.

    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .kat command!"); // Send message to the channel.
    
    // Send a message every 6 hours with Kat's channel.
    message.delete(); // Delete the command message.
    message.channel.send(":star: | Don't forget to check out Miscat Squad's channel! \n:star: | https://www.youtube.com/c/miscatsquad") // Send the first message.
    var interval = setInterval (function () { // Set the interval.
      message.channel.send(":star: | Don't forget to check out Miscat Squad's channel! \n:star: | https://www.youtube.com/c/miscatsquad")
    }, 1 * 21600000); // Change value here.   

  } 

  // SAY COMMAND
  if(command === "say") { // Check if the command is .say.
      
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: || You don't have enough permission to perform the .say command!"); // Send a message to the channel.
      
    // Get the message 
    const sayMessage = args.join(" ");
      
    // Delete the command message.
    message.delete()
      
    // Get the bot to say the message.
    message.channel.send(sayMessage);
        
  }
  
  // KICK COMMAND
  if(command === "kick") { // Check if the command is .kick.
        
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Moderator, Admin or Bot Owner role.
        return message.channel.send(":no_entry_sign: || You don't have enough permission to perform the .kick command!"); // Send message to the channel.
  
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.channel.send(":interrobang: || This member doesn't exist! \n:interrobang: | **Usage:** .ban [member] [reason]"); // Send message to channel.
    if(!member.kickable) // If the member has a higher role than the bot.
      return message.channel.send(":no_entry_sign: || I cannot kick this user!"); // Send message to channel.
      
    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.channel.send(":interrobang: || Please provide a valid reason for the kick. \n:question: | **Usage:** .kick [member] [reason]"); // Send message to channel.
      
    // Kick the member.
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send(`:zap: || <@!`+member.user.id+`> has been kicked by <@!`+message.author.id+`>. \n:zap: || Reason: ${reason}`);
  
  }
    
  // BAN COMMAND
  if(command === "ban") { // Check if the command is .ban.
  
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Moderator, Admin or Bot Owner role.
      return message.channel.send(":no_entry_sign: || You don't have enough permission to perform the .ban command!"); // Send a message to the channel.
      
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.channel.send(":interrobang: || This member doesn't exist! \n:interrobang: | **Usage:** .ban [member] [reason]"); // Send message to channel.
    if(!member.bannable) // If the member has a higher role than the bot.
      return message.channel.send(":no_entry_sign: || I cannot ban this user!"); // Send message to channel.
  
    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.channel.send(":interrobang: || Please provide a valid reason for the ban. \n:interrobang: | **Usage:** .ban [member] [reason]"); // Send message to channel.
      
    // Ban the member.
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban because of : ${error}`));
    message.channel.send(`:zap: || <@!`+member.user.id+`> has been banned by <@!`+message.author.id+`>. \n:zap: || Reason: ${reason}`);
    
  }

  // PURGE COMMAND
  client.on("message", function(message) {
    
    // Define the variables.
    let msg  = message.content.toUpperCase(); // Make message not case sensitive.
    let sender = message.author; // Find who the message's author is.
    let cont = message.content.slice(prefix.length).split(" "); // Slice off the prefix, put the rest in array based off the spaces.
    let args = cont.slice(1); // Slice off the command in cont, only leaving the number left.
    let mnt = message.mentions.users.first();
  
    // Command.
    if (msg.startsWith(prefix + "PURGE")) { // Check if the command starts with .purge.
      async function purge() { // Wrap in an async.
        message.delete(); // Delete the command message.
          
        // Verify is user has the Owner role.
        if (!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name))){ // If user doesn't have the Owner role.
          message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .purge command!") // Sends a message to the channel.
          return; //Cancels the command.

        }

        if(args == 0){
          message.channel.send(":interrobang: | Please specify how many messages you want deleted. \n:interrobang: | **Usage:** .purge [number of messages]") // Send a message to the channel.
          return;

        } else if(isNaN(args[0])){
          message.channel.send(":interrobang: | Please specify how many messages you want deleted. \n:interrobang: | **Usage:** .purge [number of messages]") // Send a message to the channel.
          return;

        } else if(!isNaN(args[0])){

          // Grab the number used.
          const fetched = await message.channel.fetchMessages({limit: args[0]});
          
          // Deleting the messages.
          message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send("Error: ${error}")); // In case of error, post it in the channel.

        }
           
      }
       
      //Calling the function.
      purge();
      
    }
           
  })

  // MUTE COMMAND
  if(command === "mute") { // Check if command is .mute.

    // Define the variables.
    let role = message.guild.roles.find("name", "Muted"); // Muted role variable.
    let memberMute = message.mentions.members.first(); // Mentioned user variable.
    
    // Send an error message to the channel, if the mentioned member doesn't exist.
    if(!memberMute)
      return message.channel.send(":interrobang: || This member doesn't exist! \n:interrobang: | **Usage:** .mute [member]");

    // Give the Muted role to the member.
    await memberMute.addRole(role)
      .catch(error => message.channel.send(":no_entry_sign: || Couldn't mute the mentioned user. Not enough permissions."));

    // Send a message to the channel, confirming the mute.
    message.channel.send(`:white_check_mark: || <@!`+memberMute.user.id+`> has been muted by <@!`+message.author.id+`>.`);
  }

  // UNMUTE COMMAND
  if(command === "unmute") { // Check if command is .unmute.

    // Define the variables.
    let role = message.guild.roles.find("name", "Muted"); // Muted role variable.
    let memberMute = message.mentions.members.first(); // Mentioned user variable.
    
    // Send an error message to the channel, if the mentioned member doesn't exist.
    if(!memberMute)
      return message.channel.send(":interrobang: || This member doesn't exist! \n:interrobang: | **Usage:** .mute [member]");

    // Remove the Muted role from the member.
    await memberMute.removeRole(role)
      .catch(error => message.channel.send(":no_entry_sign: || Couldn't unmute the mentioned user. Not enough permissions."));

    // Send a message to the channel, confirming the unmute.
    message.channel.send(`:white_check_mark: || <@!`+memberMute.user.id+`> has been unmuted by <@!`+message.author.id+`>.`);
  }

});

// REGULAR COMMANDS
client.on("message", async message => { // Message handler event.
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.
  
  // PING COMMAND
  if(command === "ping") { // Check if the command is .ping.
    
    // Calculate the user's ping.
    const m = await message.channel.send("And..."); // Temporary message while calculating the ping.
    m.edit(`:ping_pong: | Your ping is ${m.createdTimestamp - message.createdTimestamp}ms.`) // Edit the message to show the user's ping.
      
  }
   
  // INFO COMMAND
  if(command === "info") { // Check if the command is .info.      
      
    //Send a message to the channel.
    message.channel.send(":wave: | I'm Miscat-chan, the official Miscat Squad's Discord Bot!\n:wave: | Made by Sei. If you have any suggestion to improve me, make sure to DM her!\n:wave: | Version: 1.0.2")
      
  }

  // HELP COMMAND
  if(command === "help") { // Check if the command is .help.

    if(args == 0) {

      const embedHelp = new Discord.RichEmbed()

        .setTitle("Check out what the Miscat Squad has to offer!")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("For help with a specific command, type \".help [command]\".")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setURL("https://www.youtube.com/c/miscatsquad")

        .addField("Regular Commands",
        ".help  |  .info  |  .katseries  |  .ping  |  .report  |  .suggestion")

        .addField("Fun Commands",
        ".catfact  |  .coinflip  |  .dieroll  |  .dogfact  |  .katgif  |  .motiv  |  .potato  |  .puppy  |  .rate  |  .seisfave")

        .addField("Admin Commands", ".ban  |  .kat  |  .kick  |  .mute  |  .purge  |  .say  |  .unmute", true)
        .addField("Bot Owner Commands", ".avatar  |  .nick  |  .status  |  .test  |  .utag", true)

      message.member.send(embedHelp);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "help"){

      const embedHelpCm = new Discord.RichEmbed()

        .setTitle("The .help command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command allows you to see a full list of all the bot's commands or get help for a specific command. That's how you got here!")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".help [command]")

      message.member.send(embedHelpCm);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "info"){

      const embedInfo = new Discord.RichEmbed()

        .setTitle("The .info command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Use this command to check out some information about the bot, including its current version.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".info")

      message.member.send(embedInfo);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "ping"){

      const embedPing = new Discord.RichEmbed()

        .setTitle("The .ping command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Use this command to calculate your current ping.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".ping")

      message.member.send(embedPing);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "report"){

      const embedReport = new Discord.RichEmbed()

        .setTitle("The .report command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command allows you to report another member for misbehavior. Your message will be deleted afterwards, to keep your privacy, and the mods will get an alert of your report.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".report [member] [reason]")

      message.member.send(embedReport);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "catfact"){

      const embedCat = new Discord.RichEmbed()

        .setTitle("The .catfact command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Use this command to get a random cat fact.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".catfact")

      message.member.send(embedCat);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "coinflip"){

      const embedCoin = new Discord.RichEmbed()

        .setTitle("The .coinflip command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command will give you one of two results: heads or tails.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".coinflip")

      message.member.send(embedCoin);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "dieroll"){

      const embedDie = new Discord.RichEmbed()

        .setTitle("The .dieroll command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command will give you a random number from 1 to six.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".dieroll")

      message.member.send(embedDie);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "katgif"){

      const embedKatGif = new Discord.RichEmbed()

        .setTitle("The .katgif command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command will give you a random gif of Kat's reactions (still adding more).")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".katgif")

      message.member.send(embedKatGif);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "motiv" || args[0] === "mq"){

      const embedMotiv = new Discord.RichEmbed()

        .setTitle("The .motiv command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Feeling down? This command will give you a random motivational quote.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".motiv")

        .addField("Aliases",
        ".mq")

      message.member.send(embedMotiv);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "potato"){

      const embedPotato = new Discord.RichEmbed()

        .setTitle("The .potato command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Potatoes for everyone. Specify a number from 1 to 250 and you'll get potatoes.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".potato [number of potatoes]")

      message.member.send(embedPotato);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "puppy" || args[0] === "puppies"){

      const embedPuppy = new Discord.RichEmbed()

        .setTitle("The .puppy command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command will give you a random puppy picture.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".puppy")

        .addField("Aliases",
        ".puppies")

      message.member.send(embedPuppy);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "dogfact"){

      const embedDog = new Discord.RichEmbed()

        .setTitle("The .dogfact command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("This command will give you a random dog fact.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".dogfact")

      message.member.send(embedDog);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "rate"){

      const embedRate = new Discord.RichEmbed()

        .setTitle("The .rate command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("The bot will give its opinion about anything you want to. It'll rate it from 0 to 10 out of 10.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".rate [what to rate]")

      message.member.send(embedRate);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "seisfave" || args[0] === "sf"){

      const embedSei = new Discord.RichEmbed()

        .setTitle("The .seisfave command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("The Boatmaster God.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".seisfave")

        .addField("Aliases",
        ".sf")

      message.member.send(embedSei);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "ban"){

      const embedBan = new Discord.RichEmbed()

        .setTitle("The .ban command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Ban a member.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".ban [member] [reason]")

      message.member.send(embedBan);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "kat"){

      const embedKat = new Discord.RichEmbed()

        .setTitle("The .kat command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Start the schedule for Kat's channel advertisement.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".kat")

      message.member.send(embedKat);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "kick"){

      const embedKick = new Discord.RichEmbed()

        .setTitle("The .kick command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Kick a member.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".kick [member] [reason]")

      message.member.send(embedKick);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "purge"){

      const embedPurge = new Discord.RichEmbed()

        .setTitle("The .ourge command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Clean a set number of messages (maximum of 100, minimum of 2).")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".purge")

      message.member.send(embedPurge);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "say"){

      const embedSay = new Discord.RichEmbed()

        .setTitle("The .say command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Makes the bot say whatever you want.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".say")

      message.member.send(embedSay);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "avatar"){

      const embedAvatar = new Discord.RichEmbed()

        .setTitle("The .avatar command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[BOT OWNER ONLY] Changes the bot's profile picture.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".avatar")

      message.member.send(embedAvatar);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "nick"){

      const embedNick = new Discord.RichEmbed()

        .setTitle("The .nick command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[BOT OWNER ONLY] Changes the bot's nickname.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".nick")

      message.member.send(embedNick);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "status"){

      const embedStatus = new Discord.RichEmbed()

        .setTitle("The .status command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[BOT OWNER ONLY] Changes the bot's playing status.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".status")

      message.member.send(embedStatus);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "test"){

      const embedTest = new Discord.RichEmbed()

        .setTitle("The .test command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[BOT OWNER ONLY] Tests various bot functions.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".test")

      message.member.send(embedTest);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "utag"){

      const embedTag = new Discord.RichEmbed()

        .setTitle("The .utag command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[BOT OWNER ONLY] Changes the bot's user tag.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".utag")

      message.member.send(embedTag);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "mute"){

      const embedMute = new Discord.RichEmbed()

        .setTitle("The .mute command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Mute a member by giving them the Muted role.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".mute")

      message.member.send(embedMute);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "unmute"){

      const embedUnmute = new Discord.RichEmbed()

        .setTitle("The .unmute command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("[MODERATORS ONLY] Unmute a member by removing their Muted role.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".unmute")

      message.member.send(embedUnmute);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "katseries" || args[0] === "ks"){

      const embedSeries = new Discord.RichEmbed()

        .setTitle("The .katseries command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Get a link to Kat's best series!")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".katseries [series name]")

        .addField("Available Series",
        "twd, tlou, lis, top10, best18, best17, best16")

        .addField("Aliases",
        ".ks")

      message.member.send(embedSeries);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else if(args[0] === "suggestion" || args[0] === "sg"){

      const embedSuggestion = new Discord.RichEmbed()

        .setTitle("The .suggestions command.")
        .setAuthor("Miscat-chan  |  Help", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .setColor("#95dbdb")
        .setDescription("Want a new feature to be added to the bot? Use this command to write a suggestion, which will be directly sent to Sei.")

        .setFooter("Miscat-chan, the Miscat Squad bot! Made by Sei.", "https://cdn.discordapp.com/attachments/404965687015243787/404966440626814986/miscat-chan.png")

        .addField("Usage",
        ".katseries [suggestion]")

        .addField("Aliases",
        ".sg")

      message.member.send(embedSuggestion);
      message.channel.send(":white_check_mark: | A DM has been sent to you with all the help necessary!")

    } else {
      message.channel.send(":interrobang: | That command doesn't exist!\n:interrobang: | **Usage:** .help [command name]")
    }

  }

  // REPORT COMMAND
  if(command === "report") { // Check if the command is .report.
  
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.author.send(":interrobang: | This member doesn't exist! \n:interrobang: |  **Usage:** .report [member] [reason]"); // Send message to the user.
  
    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.author.send(":interrobang: | Please provide a valid reason for the report. \n:interrobang: |  **Usage:** .report [member] [reason]"); // Send message to the user.
  
    // Delete the message.
    message.delete();

    // Send the message to the security channel.
    const secChannel = client.channels.find("name", "mod-security-and-reports") //Create a variable referring to the selected channel.
    // Sending the message.
    secChannel.send(`:warning: || <@!`+member.user.id+`> has been reported by <@!`+message.author.id+`>. \n:warning: || Reason: ${reason}`)
  
  }

  // KATSERIES COMMAND
  if(command === "katseries" || command === "ks"){ // Check if the command is .katseries or .ks.

    // Define the series variables.
    let twd = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6fG0Bc_uSov-dUKessuhkww"; // The Walking Dead Playlist.
    let tlou = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6fWRI0cpN8Z5hII8o-YIwAk"; // The Last of Us Playlist.
    let lis = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6dXoZmneMlwm8zNmEfIGLzZ"; // Life is Strage Playlist.
    let top10 = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6cEZptEYgY633n_TiuBVpKI"; // Top Ten Reasons Playlist.
    let b18 = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6f78ovfArd1AgfWwpmaEexM"; // Best of 2018 Playlist.
    let b17 = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6d5ufz1zVxFKkthZmWFK3VJ"; // Best of 2017 Playlist.
    let b16 = "https://www.youtube.com/playlist?list=PLHO_p3rWIB6cq3-lkPK5Rn0-dlaLaRGyE"; // Best of 2016 Playlist.

    // Check the arguments.
    if (args == 0){
      message.member.send(":desktop: || **The Walking Dead:** " + twd +"\n:desktop: || **The Last of Us:** " + tlou +"\n:desktop: || **Life is Strange:** " + lis +"\n:desktop: || **Top Ten Reasons:** " + top10 +"\n:desktop: || **Best of 2018:** " + b18 +"\n:desktop: || **Best of 2017:** " + b17 +"\n:desktop: || **Best of 2016:** " + b16);
      message.channel.send(":white_check_mark: || A DM has been sent to you with a list of Kat's best series.")

    } else if (args == "twd" || args == "thewalkingdead" || args == "the walking dead"){
      message.channel.send(":desktop: || **The Walking Dead:** " + twd);

    } else if (args == "tlou" || args == "thelastofus" || args == "the last of us"){
      message.channel.send(":desktop: || **The Last of Us:** " + tlou);

    } else if (args == "lis" || args == "lifeisstrange" || args == "life is strange"){
      message.channel.send(":desktop: || **Life is Strange:** " + lis);

    } else if (args == "top10" || args == "top10reasons" || args == "top 10 reasons"){
      message.channel.send(":desktop: || **Top Ten Reasons:** " + top10);

    } else if (args == "best18" || args == "bestof2018" || args == "best of 2018"){
      message.channel.send(":desktop: || **Best of 2018:** " + b18);

    } else if (args == "best17" || args == "bestof2017" || args == "best of 2017"){
      message.channel.send(":desktop: || **Best of 2017:** " + b17);

    } else if (args == "best16" || args == "bestof2016" || args == "best of 2016"){
      message.channel.send(":desktop: || **Best of 2016:** " + b16);

    } else {
      message.channel.send(":interrobang: || Couldn't find that series. Are you sure you typed it correctly?\n:interrobang: || **Usage:** .katseries [series name]\n:interrobang: || **Available series:** twd, tlou, lis, top10, best18, best17, best16.");
    }

  }

  // SUGGESTION COMMAND
  if(command === "suggestion" || command === "sg"){ // Check if the command is .suggestion or .sg.

    // Define the variables.
    let sug = args.join(" "); // Get the suggestion.
    let sei = message.guild.member.get("name", "Seiko#8672"); // Get Sei's user id.

    // Send the DM to Sei.
    sei.send(sug);

  }
    
});

// FUN COMMANDS
client.on("message", async message => { // Message handler event.
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.

  // RATE COMMAND
  if(command === "rate") { // Check if the command is .rate.
    
    // Define variables.
    var grades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // Possible answers.
    var rank = grades[Math.floor(Math.random() * grades.length)]; // Variable which stores the random answer.
    const rateThis = args.join(" "); // What is there to be rated.

    // Totally not scripted.
    if(rateThis === "Sei" || rateThis === "Seiko" || rateThis === "your owner" || rateThis === "my owner")
      return message.channel.send(":thinking: | Sei can only be a 10/10!")

    // Totally not scripted V2.
    if(rateThis === "Kat" || rateThis === "Katya" || rateThis === "Miscat" || rateThis === "Miscat Squad")
      return message.channel.send(":thinking: | Kat can only be a 10/10!")
  
    // Send the message
    message.channel.send(":thinking: | Hm... I rate " + rateThis + " a " + rank + "/10!")
      
  }

  // DIEROLL COMMAND
  if(command === "dieroll") { // Check if the command is .dieroll.
    
    // Define variables.
    var sides = ["1", "2", "3", "4", "5", "6"]; // Possible answers.
    var side = sides[Math.floor(Math.random() * sides.length)]; // Variable which stores the random answer.

    // Send the message
    message.channel.send(":game_die: | You got a " + side + "!")
      
  }

  // COINFLIP COMMAND
  if(command === "coinflip") { // Check if the command is .coinflip.
    
    // Define variables.
    var coinSides = ["tails", "heads"]; // Possible answers.
    var coinSide = coinSides[Math.floor(Math.random() * coinSides.length)]; // Variable which stores the random answer.

    // Send the message
    message.channel.send(":slot_machine: | You got " + coinSide + "!")
      
  }
  
  // CATFACT COMMAND
  if(command === "catfact"){ // Check if the command is .catfact.
    let randomFact = catFacts.random();
    message.channel.send(":smiley_cat: | " + randomFact + ".");
  }

  // DOGFACT COMMAND
  if(command === "dogfact"){ // Check if the command is .dogfact.
    let randomFact = dogFacts.random();
    message.channel.send(":dog: | " + randomFact);
  }

  // POTATO COMMAND
  if(command === "potato"){ // Check if the command is .potato.

    // Define the message variable.
    var potato = ":potato:"

    // Check if the argument is a number.
    if (isNaN(args[0])) {
      return message.channel.send(":question: | That's not a valid number. \n:question: | Usage: .potato [number of potatoes]");

    }

    // Send the message.
    message.channel.send(potato.repeat(args[0]));

  }

  // PUPPY COMMAND
  if(command === "puppy" || command === "puppies"){ // Check if the command is .puppy.

    // Send the puppy picture.
    randomPuppy()
    .then(url => {
        message.channel.send(url);
    })

  }

  // SEISFAVE COMMAND
  if(command === "seisfave" || command === "sf"){

    // Send the message.
    message.channel.send(":ok_hand: | Sei's favorite!", {
      file: "https://i.imgur.com/Fhi66ja.png"

    })

  }

  // KATGIF COMMAND
  if(command === "katgif") { // Check if the command is .katgif.

    // Define variables.
    var gifs = ["https://i.imgur.com/nlwCh6J.gif", "https://i.imgur.com/XwzmfwB.gif", "https://i.imgur.com/sT67iix.gif"]; // Possible answers.
    var gif = gifs[Math.floor(Math.random() * gifs.length)]; // Variable which stores the random answer.
 
    // Send the test pic
    message.channel.send(":cat: | Kat gif!", {
      file: gif

    })

  }

  // MOTIV COMMAND
  if(command === "motiv" || command === "mq"){ // Check if the command is .catfact.
    let randomQuote = motivQuotes.random();
    message.channel.send(randomQuote + ".");
  }

});

// GET THE BOT'S TOKEN, DON'T CHANGE
client.login(process.env.BOT_TOKEN);