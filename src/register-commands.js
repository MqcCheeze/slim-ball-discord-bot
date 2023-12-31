require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    { 
        name: "ping", 
        description: "PONG!"
    },
    {   name: "pong", 
        description: "PING!"
    },
    /*/
    {
        name: "ratio", 
        description: "send ratio!"
    },
    /*/
    {
        name: "iasked", 
        description: "make the bot defend you"
    },
    {   name: "balls", 
        description: "ball",
        options: [
            {
                name: "who",
                description: "who to ping",
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: "what",
                description: "what to ping them with",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "ligma",
                        value: "ligma"
                    },
                    {
                        name: "sugma",
                        value: "sugma"
                    },
                    {
                        name: "dragon",
                        value: "dragon"
                    },
                    {
                        name: "candice",
                        value: "candice"
                    },
                    {
                        name: "bofa",
                        value: "bofa"
                    },
                    {
                        name: "cd",
                        value: "cd"
                    },
                    {
                        name: "sugon",
                        value: "sugon"
                    }
                ]
            }
        ]},
];

const rest = new REST({version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        const guildIds = process.env.GUILD_ID.split(',');

        for (const guildId of guildIds) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body: commands}
            )
        }

        console.log("Slash commands registered successfully...");
    } catch (error) {
        console.log(`Error detected: ${error}`);
    }
})();
