require("dotenv").config() // Gives access to .env file
const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");

// Intents docs at https://discord.com/developers/docs/topics/gateway#list-of-intents

const client = new Client({
    intents: [ // Give bot access to events 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.login(process.env.TOKEN);

// "(c) =>" call back function (client)
client.on("ready", (c) => { // When bot initialises
    console.log(`${c.user.username} is online...`)
});

const replies = ["stfu lol", "ratio", "cry about it", "beta", "L"];
const commands = ["wtf", "wth", "pong", "ping"]

client.on("messageCreate", (message) => { // When bot reads message

    if(message.author.id == process.env.NOPENGOOBOT_ID && message.mentions.has(client.user)) {
        const slapMsg = message.content.split(" ");
        console.log(slapMsg);
        for (const word of slapMsg) {
            if (word === "slaps" || word === "ties" || word === "bonks") {
                message.reply(`${message.mentions.users.first()} OWW why did you do that :sob:`);
                break;
            }
        }
    }


    if (message.author.bot && !commands.includes(message.content.toLowerCase())) {
        return;
    }

    /*
    // Added a switch case implementation of the same thing if you want to use it instead.
    switch(message.content.toLowerCase()){
        case "wtf" || "wth":
            message.reply(getRandomArrElement(replies));
        break;
        case "pong":
            message.reply("ping");
        break;
        case "ping":
            message.reply("pong");
        break;
    }
    */

    if(message.content.toLowerCase() === "wtf" || message.content.toLowerCase() === "wth") {
        message.reply(getRandomArrElement(replies));
        return; // Always add return statements so it doesnt read the other if() statements if you wanna keep on using those.
    }

    if (message.content.toLowerCase() === "pong"){
        message.reply("ping");
        return;
    } else if (message.content.toLowerCase() === "ping"){
        message.reply("pong");
        return;
    }
});

client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()){
        switch(interaction.commandName) {
            case "ping":
                interaction.reply("pong");
                break;
            case "pong":
                interaction.reply("ping");
                break;
            case "balls":
                interaction.reply(ballsCommand(interaction.options.get("what").value, interaction.options.get("who").value));
                break;
            /*/
            case "ratio":
                getRandomLine("src/ratioMessages.txt", function (randomRatio) {
                    let ratio = randomRatio;
                    ratio = ratio.charAt(0).toUpperCase() + ratio.slice(1);
                    interaction.reply(`Yeah what ${interaction.user} said! ${ratio}`);
                });
            /*/
            case "iasked":
                interaction.reply(`I asked ${interaction.user}`);
        }
    }
})



function getRandomArrElement(array) {
    const replyIndex = Math.floor(Math.random() * array.length);
    const selectedReply = replies[replyIndex];
    return selectedReply;
}

function getRandomLine(filename, callback){
    fs.readFile(filename, "utf-8", function(err, data){
      if(err) {
          throw err;
      }

      const lines = data.split('\n');
      
      const line = lines[Math.floor(Math.random()*lines.length)]

      callback(line);
   })
}

function ballsCommand (what, who){

    who = `<@${who}>`;

    switch(what) {
        case "ligma":
            return `# LIGMA BALLS ${who}}`;
        case "sugma":
            return `# SUGMA BALLS ${who}`;
        case "dragon":
            return `# DRAGON DEEZ BALLS ${who}`;
        case "candice":
            return `# CANDICE FIT IN YOUR MOUTH ${who}`;
        case "bofa":
            return `# BOFA DEEZ BALLS IN YOUR MOUTH ${who}`;
        case "cd":
            return `# CDEEZ NUTS ${who}`;
        case "sugon":
            return `# SUGON DEEZ NUTS ${who}`;        
    }
}