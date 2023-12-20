const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder, 
    PermissionFlagsBits, 
    SlashCommandBuilder,
    ButtonBuilder
} = require('discord.js');

const config = require('../../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Wyślij wiadomość z informacją od dotacjach na kanał Dotacje")
    .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const { guild } = interaction;
        const url = 'https://tipply.pl/u/infinityroleplay';
        const Embed = new EmbedBuilder()
        .setAuthor({
            name: "InfinityRP.pl", iconURL:  guild.iconURL({ dynamic: true })
        })
        .setDescription(`
        Chcielibyśmy przekazać, że zwracając uwagę na pytania dotyczące wsparcia serwera, od dziś jest możliwość wpłacania dobrowolnych dotacji.
        Tym samym podkreślamy, że wsparcie jest w 100% dobrowolne i absolutnie nie wymagane, żeby korzystać z serwera.
        Wasza pomoc pozwoli nam na jego utrzymanie i dalszy rozwój.
        Jeżeli chcecie wspomóc naszą pracę, możecie zrobić to poprzez kliknięcie guzika 'Dotacja'\n
        System akceptuje: (SMS/PAYPAL/PRZELEW/BLIK)
        Dobrowolna dotacja nie daje specjalnych przywilejów, ale po wpłaceniu min 50 zł otrzymacie rangę <@&1062286835159666732>. Wtedy w treści wiadomości należy wpisać swój nick Discord np.: Ezi#0001.\n
        Dziękujemy za Wasze zainteresowanie i zaangażowanie w rozówj naszego serwera - bardzo to doceniamy.
        `)
        .setColor(config.botcolor)

        const Button = new ActionRowBuilder();
        Button.addComponents(
            new ButtonBuilder()
            .setLabel('Dotacja')
            .setURL(url)
            .setStyle('Link')
            .setEmoji('💰'),
        );
        guild.channels.cache.get("1064144627352997929").send({ embeds: [Embed], components: [Button] })
    }
}