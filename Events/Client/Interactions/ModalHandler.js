const {
    ActionRowBuilder,
    ChannelType,
    ButtonBuilder,
    EmbedBuilder,
    PermissionsBitField,
} = require('discord.js');

const config = require('../../../config.json');
const DB = require('../../../Models/Ticket');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { guild, member } = interaction;
        if (!interaction.isModalSubmit()) return;
        
        const reportCat = guild.channels.cache.get(config.PlayerReportCategory);
        const bugCat = guild.channels.cache.get(config.BugReportCategory);
        const groupCat = guild.channels.cache.get(config.GrupyOsadyCategory);
        const fckCat = guild.channels.cache.get(config.FCKCategory);
        const raidCat = guild.channels.cache.get(config.RaidCategory);
        const otherCat = guild.channels.cache.get(config.OtherCategory);
        const applyCat = guild.channels.cache.get(config.ApplyCat);
        const unbanCat = guild.channels.cache.get(config.UnbanCat);

        // select latest TickedID from DB and and 1 to it
        const ticketId = await DB.find({}).sort({ TicketID: -1 }).limit(1).then((data) => {
            if (data.length == 0) return 1;
            else return parseInt(data[0].TicketID) + 1;
        });

        if (interaction.customId === 'reportModal'){
            console.log("Report player modal triggered: ");
            console.log("Creating report channel...");
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Zgloszenie gracza`,
                type: ChannelType.GuildText,
                parent: reportCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.rpstaff,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'playerReport'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'playerReport', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'bugModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Zgloszenie błędu`,
                type: ChannelType.GuildText,
                parent: bugCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'bugReport'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'bugReport', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'groupModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Rejestracja Grupy/Osady`,
                type: ChannelType.GuildText,
                parent: groupCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'register_group'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'register_group', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'fckModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `FCK`,
                type: ChannelType.GuildText,
                parent: fckCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.GameMaster,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'fck'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'fck', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'raidModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `RAID`,
                type: ChannelType.GuildText,
                parent: raidCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.GameMaster,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'raid'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'raid', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'otherModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Inny`,
                type: ChannelType.GuildText,
                parent: otherCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.GameMaster,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'other'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'other', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'applyModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Aplikacja`,
                type: ChannelType.GuildText,
                parent: applyCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'apply'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'apply', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'applyStreamModal'){
            await guild.channels.create({
                name: `STREAMER - ${member.user.username}`,
                reason: `Aplikacja`,
                type: ChannelType.GuildText,
                parent: applyCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'apply'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'applyStream', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        } else if(interaction.customId === 'unbanModal'){
            await guild.channels.create({
                name: `${member.user.username} - ${ticketId}`,
                reason: `Unban`,
                type: ChannelType.GuildText,
                parent: unbanCat,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.Administrator,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: config.EveryoneRoleID,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    }
                ],
            }).then(async (channel) => {
                await DB.create({
                    GuildId: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: 'unban'
                });
                sendAdminBtsToTicket(channel);
                sendDataToChannel(channel, interaction, 'unban', member);
                interaction.reply({ content: `Dziękujemy za zgłoszenie. Swój ticket znajdziesz tutaj: <#${channel.id}>`, ephemeral: true })
            }).catch(() => {
                interaction.reply({ content: 'Wystąpił błąd podczas tworzenia ticketa. Spróbuj ponownie, jeśli błąd nie ustąpi skontaktuj się z <@217566090073473026> w wiadomośći prywatnej.', ephemeral: true });
            })
        }
    }
}

function sendDataToChannel(channel, modal, reportType, member){
    const Embed = new EmbedBuilder()
    .setAuthor({
        name: "InfinityRP.pl", iconURL: "https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png"
    })
    .setColor(config.botcolor)
    .setDescription("Treść zgłoszenia:")
    .setTimestamp()
    .setFooter({text: "InfinityRP.pl", iconURL: "https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png"});

    switch(reportType){
        case 'playerReport':
            Embed.addFields(
                {
                    name: "Zgłaszający:",
                    value: `<@${member.user.id}>`,
                },
                {
                    name: "Nick zgłoszonej osoby:",
                    value: `${modal.fields.getTextInputValue('reportedPlayer') ? modal.fields.getTextInputValue('reportedPlayer') : "Nie podano."}`
                },
                {
                    name: "Powód zgłoszenia:",
                    value: `${modal.fields.getTextInputValue('reportedDetails')}`
                },
                {
                    name: "Materiał dowodowy:",
                    value: `${modal.fields.getTextInputValue('reportedProof') ? modal.fields.getTextInputValue('reportedProof') : "Nie podano."}`
                }
            );
            break;
        case 'bugReport':
            Embed.addFields(
                {
                    name: "Zgłaszający:",
                    value: `<@${member.user.id}>`,
                },
                {
                    name: "Opis błędu:",
                    value: `${modal.fields.getTextInputValue('bugDetails')}`
                },
                {
                    name: "Materiał dowodowy:",
                    value: `${modal.fields.getTextInputValue('bugProof') ? modal.fields.getTextInputValue('bugProof') : "Nie podano."}`
                }
            );
            break;
        case 'register_group':
                Embed.addFields(
                    {
                        name: "Aplikant:",
                        value: `<@${member.user.id}>`,
                    },
                    {
                        name: "Członkowie groupy/osady:",
                        value: `${modal.fields.getTextInputValue('groupMembers')}`
                    },
                    {
                        name: "Opis grupy/osady:",
                        value: `${modal.fields.getTextInputValue('groupDetails')}`
                    },
                    {
                        name: "Pomysł na gameplay grupy/osady:",
                        value: `${modal.fields.getTextInputValue('groupIdeas')}`
                    },
                    {
                        name: "Logotyp:",
                        value: `${modal.fields.getTextInputValue('groupLogo')}`
                    }
                );
            break;
        case 'fck':
            Embed.addFields(
                {
                    name: "Osoba składająca wniosek o FCK:",
                    value: `<@${member.user.id}>`
                },
                {
                    name: "Imię i Nazwisko postaci która ma otrzymać FCK:",
                    value: `${modal.fields.getTextInputValue('fckCharacter')}`
                },
                {
                    name: "Uzasadnienie wniosku:",
                    value: `${modal.fields.getTextInputValue('fckDetails')}`
                }
            );
            break;
        case 'raid':
            Embed.addFields(
                {
                    name: "Osoba składająca wniosek o Raid",
                    value: `<@${member.user.id}>`
                },
                {
                    name: "Uzasadnienie wniosku:",
                    value: `${modal.fields.getTextInputValue('raidDetails')}`
                },
                {
                    name: "Do kogo należy baza:",
                    value: `${modal.fields.getTextInputValue('raidOwner')}`
                },
                {
                    name: "Lokalizacja bazy:",
                    value: `${modal.fields.getTextInputValue('raidLocation')}`
                }
            );
            break;
        case 'other':
            Embed.addFields(
                {
                    name: "Osoba zgłaszająca:",
                    value: `<@${member.user.id}>`
                },
                {
                    name: "Opis zgłoszenia:",
                    value: `${modal.fields.getTextInputValue('otherDetails') ? modal.fields.getTextInputValue('otherDetails') : "Nastąpił błąd podczas wysyłania zgłoszenia. Przez co pole jest puste."}`
                }
            )
            break;
        case 'unban':
            Embed.addFields(
                {
                    name: "Osoba apelująca:",
                    value: `<@${member.user.id}>`
                },
                {
                    name: "Link do profilu steam:",
                    value: `${modal.fields.getTextInputValue('unbanSteam')}`
                }, 
                {
                    name: "Powód bana:",
                    value: `${modal.fields.getTextInputValue('unbanDetails')}`
                },
                {
                    name: "Data i godzina bana:",
                    value: `${modal.fields.getTextInputValue('unbanDate')}`
                },
                {
                    name: "Uzasadnienie Apelacji:",
                    value: `${modal.fields.getTextInputValue('unbanMessage')}`
                }
            );
            break;
        case 'apply':
                Embed.addFields(
                    {
                        name: "Osoba aplikująca:",
                        value: `<@${member.user.id}>`
                    },
                    {
                        name: "Imię:",
                        value: `${modal.fields.getTextInputValue('applyName')}`
                    }, 
                    {
                        name: "Wiek:",
                        value: `${modal.fields.getTextInputValue('applyAge')}`
                    },
                    {
                        name: "Aplikuje na rolę:",
                        value: `${modal.fields.getTextInputValue('applyRole')}`
                    },
                    {
                        name: "Link do profilu steam:",
                        value: `${modal.fields.getTextInputValue('applySteam')}`
                    },
                    {
                        name: "Dlaczego Ty:",
                        value: `${modal.fields.getTextInputValue('applyWhyYou')}`
                    }
                )
            break;
        case 'applyStream':
            Embed.addFields(
                {
                    name: "Osoba aplikująca:",
                    value: `<@${member.user.id}>`
                },
                {
                    name: 'Link do kanału:',
                    value: `${modal.fields.getTextInputValue('applyStreamChannel')}`
                },
                {
                    name: 'Odgrywana postać: ',
                    value: `${modal.fields.getTextInputValue('applyStreamerRP')}`
                },
                {
                    name: 'Link do profilu steam:',
                    value: `${modal.fields.getTextInputValue('applyStreamerSteam')}`
                }
            );
            break;
    }

    channel.send({ embeds: [Embed] });
}

function sendAdminBtsToTicket(channel){
    const Embed = new EmbedBuilder()
    .setAuthor({
        name: "InfinityRP.pl", iconURL: "https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png"
    })
    .setColor(config.botcolor)
    .setDescription("Dziękujemy za zgłoszenie. Nasz zespół zajmie się nim wkrótce.\n\nGuziki poniżej służą do zarządzania ticketem. Są one dostępne tylko i wyłącznie dla Administracji.")
    .setTimestamp()
    .setFooter({text: "InfinityRP.pl", iconURL: "https://cdn.discordapp.com/avatars/631951598360199188/82792e1cb090e8726a625339976ec647.png"});

    const Buttons = new ActionRowBuilder();
    Buttons.addComponents(
        new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Zamknij ticket')
        .setStyle('Danger')
        .setEmoji('🔒'),
        new ButtonBuilder()
        .setCustomId('unlock_ticket')
        .setLabel('Odblokuj ticket')
        .setStyle('Success')
        .setEmoji('🔓'),
        new ButtonBuilder()
        .setCustomId('lock_ticket')
        .setLabel('Zablokuj ticket')
        .setStyle('Secondary')
        .setEmoji('🔒'),
    );

    channel.send({ embeds: [Embed], components: [Buttons] })
}