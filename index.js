// SETUP THE BOT
const Discord = require('discord.js');
const client = new Discord.Client();

const catFacts = require('cat-facts');
const dogFacts = require('dog-facts');
const imageSearch = require('node-google-image-search');

// DEFINE THE PREFIX
const prefix = ".";

// SET BOT STATUS
client.on('ready', () => { // When the bot is ready.
    client.user.setPresence({ game: { name: 'Miscat\'s videos', type: 0 } }); // Set the bot's status.
});
    
// WELCOMING NEW MEMBERS
client.on("guildMemberAdd", member => { // Listener event: user joining the server.
    
    // Sending message to main channel.
    const welcomeChannel = client.channels.find("name", "general-chat") //Create a variable referring to the selected channel.
    // Sending the message.
    welcomeChannel.send("<@!"+member.user.id+"> || **Fistbump! Welcome to the squad!** \nBe sure to introduce yourself in the #miscat-squad-introductions channel to get the fun started! And if you need help the #support-group is opened to you 24/7! Make yourself at home and embrace your inner fangirl and fanboy every single day!");
    
});

// PURGE COMMAND
client.on("message", function(message) {
    
    // Define the variables.
    let msg  = message.content.toUpperCase(); // Make message not case sensitive.
    let sender = message.author; // Find who the message's author is.
    let cont = message.content.slice(prefix.length).split(" "); // Slice off the prefix, put the rest in array based off the spaces.
    let args = cont.slice(1); // Slice off the command in cont, only leaving the number left.
    
    // Command.
    if (msg.startsWith(prefix + "PURGE")) { // Check if the command starts with .purge.
         async function purge() { // Wrap in an async.
            message.delete(); // Delete the command message.
            
            // Verify is user has the Owner role.
            if (!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name))){ // If user doesn't have the Owner role.
                message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .purge command!") // Sends a message to the channel.
                return; //Cancels the command.

            }
             
            // Verify if the variable is a number.
            if (isNaN(args[0])) {
                message.channel.send(":question: | Please specify how many messages you want deleted. \n:question: | **Usage:** .purge [number of messages]") // Send a message to the channel.
                return; // Cancels the command.

            }
             
            const fetched = await message.channel.fetchMessages({limit: args[0]}); //Grab the number used in the !purge command.
            
            //Deleting the messages.
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send("Error: ${error}")); // In case of error, post it in the channel.

         }
         
        //Calling the function.
        purge();
        
    }
             
});

// IMAGE SEARCH COMMAND
client.on("message", async message => { // Message handler event.
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.

  if(command === 'search'){
    // Define the search results variable.
    var results = imageSearch('love', callback, 0, 1); //args[0]

   // Show the results.
    function callback(results) {
    message.channel.send(results);

    }

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

  // KAT COMMAND
  if(command === "kat" || command === "miscat" || command === "miscatsquad"){
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .kat command!"); // Send message to the channel.
    
    // Send a message every 60 minutes with Kat's channel.
    message.delete(); // Delete the command message.
    message.channel.send(":star: | Don't forget to check out Miscat Squad's channel! \n:star: | https://www.youtube.com/c/miscatsquad") // Send the first message.
    var interval = setInterval (function () { // Set the interval.
      message.channel.send(":star: | Don't forget to check out Miscat Squad's channel! \n:star: | https://www.youtube.com/c/miscatsquad")
    }, 1 * 3600000); // Change value here.   

  } 

  // NICK COMMAND
  if(command === "nick") { // Check if the command is .nick.
      
    // Limit it to admins.
    if(!message.member.roles.some(r=>["NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | Only Sei can perform the .nick command!"); // Send message to the channel.
    
    // Get the nickname. 
    const newNickname = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Change the bot's nickname.
    message.guild.members.get(client.user.id).setNickname(newNickname);
      
  }
   
  // INFO COMMAND
  if(command === "info") { // Check if the command is .info.
      
    //Send a message to the channel.
    message.channel.send(":wave: | I'm Miscat-chan, the official Miscat Squad's Discord Bot! Made by Sei. If you have any suggestion to improve me, make sure to DM her!")
      
  }
  
  // SAY COMMAND
  if(command === "say") { // Check if the command is .say.
      
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Admin, Moderator or Bot Owner role.
      return message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .say command!"); // Send a message to the channel.
    
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
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Owner or Admin role.
      return message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .kick command!"); // If user doesn't have the Owner or Admin role.

    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("this member does not exist!"); // Send message to channel.
    if(!member.kickable) // If the member has a higher role than the bot.
      return message.reply("I cannot kick this user!"); // Send message to channel.
    
    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.channel.send(":question: | Please provide a valid reason for the kick. \n:question: | **Usage:** .kick [member] [reason]"); // Send message to channel.
    
    // Kick the member.
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  // BAN COMMAND
  if(command === "ban") { // Check if the command is .ban.

    // Limit it to admins.
    if(!message.member.roles.some(r=>["Moderator", "Admin", "NSFW Goddess"].includes(r.name)) ) // If user doesn't have the Owner or Admin role.
      return message.channel.send(":no_entry_sign: | You don't have enough permission to perform the .ban command!"); // If user doesn't have the Owner or Admin role.
    
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("this member does not exist!");  // Send message to channel.
    if(!member.bannable) // If the member has a higher role than the bot.
      return message.reply("I cannot ban this user!"); // Send message to channel.

    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.channel.send(":question: | Please provide a valid reason for the ban. \n:question: | **Usage:** .ban [member] [reason]"); // Send message to channel.
    
    // Ban the member.
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  
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
  
    // Send the message
    message.channel.send(":thinking: | Hm... I rate " + rateThis + " a " + rank + "/10!")
      
  }
  
  // CATFACT COMMAND
  if(command === "catfact"){ // Check if the command is .catfact.
    let randomFact = catFacts.random();
    message.channel.send(":smiley_cat: | " + randomFact + ".");
  }

  //DOGFACT COMMAND
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

});

// GET THE BOT'S TOKEN, DON'T CHANGE
client.login(process.env.BOT_TOKEN);