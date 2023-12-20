const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    subCommand: "whitelist.add",


    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     **/

    async execute(interaction) {
        // to do : add dayzapi and check whitelist
        await interaction.reply("Whitelist Check");
    }
}