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

client.on("messageCreate", (message) => { // When bot reads message

    if (message.author.bot) {
        return
    }

    if(message.content === "wtf" || message.content === "Wtf" || message.content === "wth" || message.content === "Wth") {
        message.reply(getRandomArrElement(replies));
    }

    if (message.content === "pong"){
        message.reply("ping");
    } else if (message.content === "ping"){
        message.reply("pong");
    }
});

client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()){
        switch(interaction.commandName){
            case "ping":
                interaction.reply("pong");
                break;
            case "pong":
                interaction.reply("ping");
                break;
            case "balls":
                interaction.reply(ballsCommand(interaction.options.get("what").value, interaction.options.get("who").value));
                break;
            case "ratio":

            getRandomLine("src/ratioMessages.txt", function (randomRatio) {
                let ratio = randomRatio;
                ratio = ratio.charAt(0).toUpperCase() + ratio.slice(1);
                interaction.reply(`Yeah what ${interaction.user} said! ${ratio}`);
            });
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