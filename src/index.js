require("dotenv").config() // Gives access to .env file
const { Client, IntentsBitField } = require("discord.js");

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

const replies = ["Deez nuts", "Ligma balls", "Candice", "Sugma", "Dragon"];

client.on("messageCreate", (message) => { // When bot reads message

    if (message.author.bot) {
        return
    }

    if(message.content === "slam") {
        const replyIndex = Math.floor(Math.random() * replies.length);
        const selectedReply = replies[replyIndex];
        message.reply(selectedReply);
    }
});

client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()){
        switch(interaction.commandName){
            case "ping":
                interaction.reply("Hey!");
                break;
        }
    }
})