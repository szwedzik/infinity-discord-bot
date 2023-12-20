const { ChatInputCommandInteraction, EmbedBuilder, Guild } = require('discord.js');
const { checkWhitelist } = require('../../../Functions/DayZAPI.js');

module.exports = {
    subCommand: "whitelist.check",


    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     **/

    async execute(interaction) {
        let steamid = interaction.options.getString("steamid");
        let whitelistData = await checkWhitelist(steamid);
        let priorityData = await checkPriority(steamid);

        let embed = new EmbedBuilder()
            .setAuthor({
                name: `InfinityRP.pl - Helper`
            })
            .setDescription("O to informacje o graczu:")
            .addFields(
                {
                    name: "Whitelista",
                    value: whitelistData.status ? "Tak" : "Nie",
                },
                {
                    name: "Priorytet",
                    value: data.priority ? "Tak" : "Nie",
                }
            )
            .setTimestamp()


        interaction.reply({ embeds: [embed]});
       
    }
}