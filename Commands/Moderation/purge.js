const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits, 
    SlashCommandBuilder,
} = require('discord.js');

const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Usuń wiadomości z kanału.")
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES)
    .addNumberOption(options => options
        .setName("amount")
        .setDescription("Podaj ilość wiadomości do usunięcia.")
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName("user")
        .setDescription("Podaj użytkownika którego wiadomości mają zostać usunięte.")
        .setRequired(false)
    ),
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const Amount = interaction.options.getNumber("amount");
        const Target = interaction.options.getUser("user");

        const channelMessages = await interaction.channel.messages.fetch();
        const replyEmbed = new EmbedBuilder()
        .setColor(config.botcolor)
        .setAuthor({
            name: "InfinityRP.pl",
        })

        if(Target){
            let i = 0;
            let messagesToDelete = [];

            channelMessages.filter((message) => {
                if(message.author.id === Target.id && Amount > i){
                    messagesToDelete.push(message);
                    i++;
                }
            })

            interaction.channel.bulkDelete(messagesToDelete, true).then((message) =>{
                interaction.reply({
                    embeds: [replyEmbed.setDescription(`🧹 Usunięto **${message.size}** wiadomości. Użytkownika: <@${Target.id}>`)],
                    ephemeral: true
                })
            });
        } else {
            interaction.channel.bulkDelete(Amount, true).then((message) =>{
                interaction.reply({
                    embeds: [replyEmbed.setDescription(`🧹 Usunięto **${message.size}** wiadomości.`)],
                    ephemeral: true
                })
            });
        }
    }    
}