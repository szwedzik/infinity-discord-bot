const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder, 
    PermissionFlagsBits, 
    SlashCommandBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ticketsetup")
    .setDescription("Utwórz system ticketów.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        const { guild } = interaction;


        const Embed = new EmbedBuilder()
        .setAuthor({
            name: "InfinityRP.pl", iconURL:  guild.iconURL({ dynamic: true })
        })
        .setDescription("Aby otworzyć ticket, wybierz odpowiednią kategorię.")
        .setColor(config.botcolor)

        const ticketMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_menu')
            .setPlaceholder('Wybierz kategorię')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Zgłoś gracza',
                    description: 'Wybierz tę opcję, jeśli chcesz zgłosić gracza.',
                    value: 'report_player',
                    emoji: '👮',
                },
                {
                    label: 'Zgłoś błąd',
                    description: 'Wybierz tę opcję, jeśli chcesz zgłosić błąd na serwerze.',
                    value: 'report_bug',
                    emoji: '🐛',
                },
                {
                    label: 'Rejestracja Grupy/Osady',
                    description: 'Wybierz tę opcję, jeśli chcesz zarejestrować grupę lub osadę.',
                    value: 'register_group',
                    emoji: '🌇',
                },
                {
                    label: 'FCK',
                    description: 'Wybierz tę opcję, jeśli chcesz wystąpić o prośbę na FCK dla gracza.',
                    value: 'fck',
                    emoji: '🔪',
                },
                {
                    label: 'Raid',
                    description: 'Wybierz tę opcję, jeśli chcesz wystąpić o prośbę na Raid bazy.',
                    value: 'raid',
                    emoji: '🔫',
                },
                {
                    label: 'Odwołaj się od bana',
                    description: 'Wybierz tę opcję, jeśli chcesz wystąpić z prośbą o Unbana.',
                    value: 'unban',
                    emoji: '💣',
                },
                {
                    label: 'Aplikuj',
                    description: 'Wybierz tę opcję, jeśli chcesz aplikować na stanowisko: Moderatora',
                    value: 'apply',
                    emoji: '📝',
                },
                {
                  label: 'Streamer',
                  description: 'Aplikacja na rangę Streamer',
                  value: 'apply_streamer',
                  emoji: '🎥'  
                },
                {
                    label: 'Inne',
                    description: 'Wybierz tę opcję, jeśli żaden z powyższych nie pasuje do twojego zgłoszenia.',
                    value: 'other',
                    emoji: '❓',
                }
            ]);
        
        const row = new ActionRowBuilder()
        .addComponents(
            ticketMenu
        );
        guild.channels.cache.get(config.OpenTicketID).send({embeds: [Embed], components: [row]});
    }
}