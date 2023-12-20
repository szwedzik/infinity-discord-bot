const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    PermissionFlagsBits, 
    SlashCommandBuilder,
    Client
} = require('discord.js');

const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("radio")
    .setDescription("Wyślij wiadomość w strefie IC. Wiadomość zostanie automatycznie usunięta po 24 godzinach.")
    .addStringOption(options => options
        .setName("message")
        .setDescription("Podaj treść wiadomości która ma się pojawić na kanale Radio.")
        .setRequired(true) 
    ),
    async execute(interaction){
        const { guild } = interaction;
        const message = interaction.options.getString("message");
        const radioChannel = guild.channels.cache.get(config.ICRadio);
        const radioLogChannel = guild.channels.cache.get(config.ICRadioLog);

        const Embed = new EmbedBuilder()
            .setAuthor({
                name: "Nadane przez: Radio Deer Isle"
            })
            .setThumbnail("https://embed.gyazo.com/b5f4889318f2b12229e2b9904e07c6a3.png")
            .setDescription(`Na częstotliwości 102.95 Mhz udało Ci się usłyszeć krótki komunikat...\n**${message}**`)
            .setColor(config.botcolor)
            .setTimestamp()
            .setFooter({ text: "Wiadomość nadana przez nieznajomego... - Zostanie usunięta za 24 godziny od wysłania." })

        const LogEmbed = new EmbedBuilder()
            .setAuthor({
                name: `InfinityRP.pl - Log`
            })
            .setDescription(`<@${interaction.member.id}> wysłał wiadomość na kanale Radio.\n\n**Treść wiadomości:**\n${message}`)
            .setColor(config.botcolor)
            .setTimestamp()


        interaction.reply({content: 'Wiadomość została wysłana. Zostanie ona usunięta za 24 godziny.', ephemeral: true})
        radioChannel.send({embeds: [Embed]}).then(msg => setTimeout(() => msg.delete(), 86400000));
        radioLogChannel.send({embeds: [LogEmbed]})

    }
}