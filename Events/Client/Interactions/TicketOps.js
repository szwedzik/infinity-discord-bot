
const { ButtonInteraction, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { createTranscript } = require("discord-html-transcripts");
const config = require('../../../config.json');
const DB = require('../../../Models/Ticket');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        if(!interaction.isButton()) return;

        const { guild, customId, channel, member } = interaction;

        if(!["close_ticket", "close_ticket_reason", "lock_ticket", "unlock_ticket"].includes(customId)) return;

        if(member.permissions.has(PermissionsBitField.Flags.Administrator) || member.permissions.has(PermissionsBitField.Flags.ManageRoles) || member.permissions.has(PermissionsBitField.Flags.ManageMessages)){
            const Embed = new EmbedBuilder()

            DB.findOne({ ChannelID: channel.id }, async(err, data) => {
                if (err) throw err;
                if (!data) return interaction.reply({ content: "Nie znaleziono ticketa w bazie danych. Usuń go ręcznie.", ephemeral: true})
                const member = guild.members.cache.get(data.MemberID);

                switch(customId){
                    case "lock_ticket":
                        if(data.Locked == true) return interaction.reply({ content: "Ten ticket jest już zablokowany.", ephemeral: true })
                        await DB.updateOne({ ChannelID: channel.id }, { Locked: true })
                        Embed.setDescription("🔒 | Ten ticket został zablokowany na czas rozpatrywania.")
                        channel.permissionOverwrites.edit(data.MemberID, {
                            SendMessages: false
                        });
                        interaction.reply({ embeds: [Embed]})
                        try {
                            Embed.setTitle(null);
                            Embed.setAuthor( { name: `InfinityRP.pl`, iconURL: 'https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png'} )
                            Embed.setDescription(`Twój ticket został zablokowany na czas rozpatrywania przez: <@${interaction.member.id}>.`)
                            Embed.setColor("BLACK")
                            member.send({ embeds: [Embed] })
                        } catch (err) {
                            console.log(err)
                        }

                        break;
                    case "unlock_ticket":
                        if(data.Locked == false) return interaction.reply({ content: "Ten ticket jest już odblokowany.", ephemeral: true })
                        await DB.updateOne({
                            ChannelID: channel.id
                        }, {
                            Locked: false
                        })
                        Embed.setDescription("🔓 | Ten ticket został odblokowany.")
                        channel.permissionOverwrites.edit(data.MemberID, {
                            SendMessages: true
                        });
                        interaction.reply({ embeds: [Embed]})

                        try {
                            Embed.setTitle(null);
                            Embed.setAuthor( { name: `InfinityRP.pl`, iconURL: 'https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png'} )
                            Embed.setDescription(`Twój ticket został odblokowany przez: <@${interaction.member.id}>.`)
                            Embed.setColor("BLACK")
                            member.send({ embeds: [Embed] })
                        } catch (err) {
                            console.log(err)
                        }
                        
                        break;
                    case "close_ticket":
                        if(data.Closed) return interaction.reply({ content: "Ten ticket jest już zamknięty.", ephemeral: true })
                        const attachment = await createTranscript(channel, {
                            limit: -1,
                            returnType: 'attachment',
                            fileName: `${data.Type} - ${data.TicketID}.html`,
                        });

                        await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                        let category = '';

                        switch(data.Type){
                            case "playerReport":
                                category = "Zgłoszenia: Gracz";
                                break;
                            case "bugReport":
                                category = "Zgłoszenia: Błędy";
                                break;
                            case "register_group":
                                category = "Zgłoszenia: Grupy/Osady";
                                break;
                            case "fck":
                                category = "Zgłoszenia: FCK";
                                break;
                            case "raid":
                                category = "Zgłoszenia: RAID";
                                break;
                            case "other":
                                category = "Zgłoszenia: Inne";
                                break;
                            case "apply":
                                category = "Aplikacje";
                                break;
                            case "unban":
                                category = "Odwołanie od Bana";
                                break;
                            default:
                                category = "Błąd podczas pobierania kategorii.";
                                break;
                        }

                        const message = await guild.channels.cache.get(config.TicketLog).send({
                            embeds: [
                                Embed.setAuthor(
                                    { 
                                        name: "InfinityRP.pl", 
                                        iconURL: "https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png"
                                    }
                                )
                                .setTitle(`📝 | Transkrypt ticketu: #${data.TicketID}`)
                                .setDescription(`\nTicket utworzony przez: <@${data.MemberID}> w kategorii: ${category} \nTen ticket został zamknięty przez: <@${interaction.member.id}>.`)
                            ],
                            files: [attachment]
                        });

                        interaction.reply({ embeds: [Embed.setDescription(`Transkrypt ticketu: [KLICK](${message.url})`)] });

                        try {
                            Embed.setTitle(null);
                            Embed.setAuthor( { name: `InfinityRP.pl`, iconURL: 'https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png'} )
                            Embed.setDescription(`Twój ticket został zamknięty przez: <@${interaction.member.id}>.`)
                            Embed.setColor("BLACK")
                            member.send({ embeds: [Embed] })
                        } catch (err) {
                            console.log(err)
                        }
                        setTimeout(() => {
                            channel.delete();
                        }, 10 * 1000);
                        break;
                }
            });
        } else {
            return interaction.reply({ content: "Nie masz tego zrobić...", ephemeral: true }) 
        }
    }
}