const {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,

} = require('discord.js');



module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if(interaction.customId === 'ticket_menu'){
            switch(interaction.values.shift()){
                case 'report_player':
                        const modal = new ModalBuilder()
                        .setCustomId('reportModal')
                        .setTitle('Zgłoś gracza');

                        const reportedPlayer = new TextInputBuilder()
                            .setCustomId('reportedPlayer')
                            .setLabel("Podaj nick gracza, którego chcesz zgłosić.")
                            .setPlaceholder("Jeśli nie znasz nicku, pomiń to pole.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(false);
                        const reportedDetails = new TextInputBuilder()
                            .setCustomId('reportedDetails')
                            .setLabel("Opisz powód zgłoszenia.")
                            .setPlaceholder("Wpisz tutaj powód zgłoszenia. Im więcej szczegółów, tym lepiej.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true);
                        const reportedProof = new TextInputBuilder()
                            .setCustomId('reportedProof')
                            .setLabel("Materiał dowodowy.")
                            .setPlaceholder("Jeśli masz jakie kolwiek materiały dowodowe, wklej je tutaj. Inaczej pomiń to pole.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(false);
                        
                        const firstRow = new ActionRowBuilder().addComponents(reportedPlayer);
                        const secondRow = new ActionRowBuilder().addComponents(reportedDetails);
                        const thirdRow = new ActionRowBuilder().addComponents(reportedProof);

                        modal.addComponents(firstRow, secondRow, thirdRow);
                        await interaction.showModal(modal);
                    break;
                case 'report_bug':
                        const bugModal = new ModalBuilder()
                            .setCustomId('bugModal')
                            .setTitle('Zgłoś błąd na serwerze');
                        const bugDetails = new TextInputBuilder()
                            .setCustomId('bugDetails')
                            .setLabel("Opisz błąd.")
                            .setPlaceholder("Wpisz tutaj opis błędu. Im więcej szczegółów, tym lepiej.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true);
                        const bugProof = new TextInputBuilder()
                            .setCustomId('bugProof')
                            .setLabel("Materiał dowodowy.")
                            .setPlaceholder("Jeśli masz jakie kolwiek materiały dowodowe, wklej je tutaj. Inaczej pomiń to pole.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(false);

                        const bugFirstRow = new ActionRowBuilder().addComponents(bugDetails);
                        const bugSecondRow = new ActionRowBuilder().addComponents(bugProof);

                        bugModal.addComponents(bugFirstRow, bugSecondRow);
                        await interaction.showModal(bugModal);
                    break;
                case 'register_group':
                        const groupModal = new ModalBuilder()
                            .setCustomId('groupModal')
                            .setTitle('Aplikuj o Grupę/Osadę');
                        const groupName = new TextInputBuilder()
                            .setCustomId('groupName')
                            .setLabel("Podaj nazwę grupy/osady.")
                            .setPlaceholder("Wpisz tutaj nazwę grupy/osady.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true);
                        const groupMembers = new TextInputBuilder()
                            .setCustomId('groupMembers')
                            .setLabel("Członkowie grupy/osady.")
                            .setPlaceholder("Tutaj wypisujemy Liderów oraz członków. Podajemy pełny nick  z discorda (np. @Ezi#0001)")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true);
                        const groupDetails = new TextInputBuilder()
                            .setCustomId('groupDetails')
                            .setLabel("Krótka historia grupy/osady")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        const groupIdeas = new TextInputBuilder()
                            .setCustomId('groupIdeas')
                            .setLabel("Pomysły na grę")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        const groupLogo = new TextInputBuilder()
                            .setCustomId('groupLogo')
                            .setLabel("Logo grupy/osady")
                            .setPlaceholder("Wklej tutaj link do logotypu.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true);

                        const groupFirstRow = new ActionRowBuilder().addComponents(groupName);
                        const groupSecondRow = new ActionRowBuilder().addComponents(groupMembers);
                        const groupThirdRow = new ActionRowBuilder().addComponents(groupDetails);
                        const groupFourthRow = new ActionRowBuilder().addComponents(groupIdeas);
                        const groupFifthRow = new ActionRowBuilder().addComponents(groupLogo);

                        groupModal.addComponents(groupFirstRow, groupSecondRow, groupThirdRow, groupFourthRow, groupFifthRow);
                        await interaction.showModal(groupModal);
                    break;
                case 'fck':
                        const fckModal = new ModalBuilder()
                            .setCustomId('fckModal')
                            .setTitle("Prośba o FCK");
                        const fckCharacter = new TextInputBuilder()
                            .setCustomId('fckCharacter')
                            .setLabel("Imię i Nazwisko")
                            .setPlaceholder("Podaj imię i nazwisko IC postaci której dotyczy wniosek.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true);
                        const fckDetails = new TextInputBuilder()
                            .setCustomId('fckDetails')
                            .setLabel("Powód FCK")
                            .setPlaceholder("Opisz powód IC dla którego występujesz o FCK.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)

                        const fckFirstRow = new ActionRowBuilder().addComponents(fckCharacter);
                        const fckSecondRow = new ActionRowBuilder().addComponents(fckDetails);

                        fckModal.addComponents(fckFirstRow, fckSecondRow);
                        await interaction.showModal(fckModal);
                    break;
                case 'raid':
                        const raidModal = new ModalBuilder()
                            .setCustomId('raidModal')
                            .setTitle("Prośba o zgodę na RAID");
                        const raidOwner = new TextInputBuilder()
                            .setCustomId('raidOwner')
                            .setLabel("Do kogo należy baza?")
                            .setPlaceholder("Podaj imię i nazwisko IC postaci której należy baza.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const raidDetails = new TextInputBuilder()
                            .setCustomId('raidDetails')
                            .setLabel("Powód Raida")
                            .setPlaceholder("Opisz powód IC dla którego występujesz o Raid na czyjąś bazę.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        const raidLocation = new TextInputBuilder()
                            .setCustomId('raidLocation')
                            .setLabel("Podaj lokalizację bazy")
                            .setPlaceholder("Podaj lokalizację bazy na której chcesz wykonać Raid.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true);

                        const raidFristRow = new ActionRowBuilder().addComponents(raidOwner);
                        const raidSecondRow = new ActionRowBuilder().addComponents(raidDetails);
                        const raidThirdRow = new ActionRowBuilder().addComponents(raidLocation);

                        raidModal.addComponents(raidFristRow, raidSecondRow, raidThirdRow);
                        await interaction.showModal(raidModal);
                    break;
                case 'other':
                        const otherModal = new ModalBuilder()
                            .setCustomId('otherModal')
                            .setTitle("Inne");
                        const OtherDetails = new TextInputBuilder()
                            .setCustomId('otherDetails')
                            .setLabel("Opisz swój problem")
                            .setPlaceholder("Opisz swój problem.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        
                        const otherFirstRow = new ActionRowBuilder().addComponents(OtherDetails);

                        otherModal.addComponents(otherFirstRow);
                        await interaction.showModal(otherModal);
                    break;
                case 'unban':
                        const unbanModal = new ModalBuilder()
                            .setCustomId('unbanModal')
                            .setTitle("Prośba o unban");
                        const unbanSteam = new TextInputBuilder()
                            .setCustomId('unbanSteam')
                            .setLabel("Podaj link do twojego profilu steam.")
                            .setPlaceholder("https://steamcommunity.com/id/steamid/")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const unbanDetails = new TextInputBuilder()
                            .setCustomId('unbanDetails')
                            .setLabel("Powód bana")
                            .setPlaceholder("Podaj powód bana.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        const unbanDate = new TextInputBuilder()
                            .setCustomId('unbanDate')
                            .setLabel("Podaj datę bana")
                            .setPlaceholder("Podaj datę bana.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const unbanMessage = new TextInputBuilder()
                            .setCustomId('unbanMessage')
                            .setLabel("Uzasadnij swoją apelację")
                            .setPlaceholder("Uzasadnienie im dłuższe tym lepiej.")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        
                        const unbanFirstRow = new ActionRowBuilder().addComponents(unbanSteam);
                        const unbanSecondRow = new ActionRowBuilder().addComponents(unbanDetails);
                        const unbanThirdRow = new ActionRowBuilder().addComponents(unbanDate);
                        const unbanFourthRow = new ActionRowBuilder().addComponents(unbanMessage);

                        unbanModal.addComponents(unbanFirstRow, unbanSecondRow, unbanThirdRow, unbanFourthRow);
                        await interaction.showModal(unbanModal);
                    break;
                case 'apply':
                    return interaction.reply({ content: `Rekrutacja na stanowisko **Moderatora** jest na chwilę obecną wstrzymana.`, ephemeral: true });
                        const applyModal = new ModalBuilder()
                            .setCustomId('applyModal')
                            .setTitle('Aplikuj na stanowisko Moderatora');
                        const applyName = new TextInputBuilder()
                            .setCustomId('applyName')
                            .setLabel("Jak masz na imię?")
                            .setPlaceholder("Imię")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const applyAge = new TextInputBuilder()
                            .setCustomId('applyAge')
                            .setLabel("Ile masz lat?")
                            .setPlaceholder("Podaj swój wiek.")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const applyRole = new TextInputBuilder()
                            .setCustomId('applyRole')
                            .setLabel("Na jaką rolę aplikujesz?")
                            .setPlaceholder("Dostępne role: (Moderator)")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const applySteam = new TextInputBuilder()
                            .setCustomId('applySteam')
                            .setLabel("Podaj link do twojego profilu steam")
                            .setPlaceholder("https://steamcommunity.com/id/steamid")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        const applyWhyYou = new TextInputBuilder()
                            .setCustomId('applyWhyYou')
                            .setLabel("Dlaczego Ty?")
                            .setPlaceholder("Dlaczego powinniśmy Cię wybrać?")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        
                        const applyFirstRow = new ActionRowBuilder().addComponents(applyName);
                        const applySecondRow = new ActionRowBuilder().addComponents(applyAge);
                        const applyThirdRow = new ActionRowBuilder().addComponents(applyRole);
                        const applyFourthRow = new ActionRowBuilder().addComponents(applySteam);
                        const applyFifthRow = new ActionRowBuilder().addComponents(applyWhyYou);

                        applyModal.addComponents(applyFirstRow, applySecondRow, applyThirdRow, applyFourthRow, applyFifthRow);
                        await interaction.showModal(applyModal);
                    break;
                    case 'apply_streamer':
                        //return interaction.reply({ content: `Rekrutacja na chwilę obecną jest wstrzymana.`, ephemeral: true });
                            const applyStreamerModal = new ModalBuilder()
                                .setCustomId('applyStreamModal')
                                .setTitle('Aplikuj na rangę Streamer');
    
                            const applyStreamerChannel = new TextInputBuilder()
                                .setCustomId('applyStreamChannel')
                                .setLabel("Link do twojego kanału")
                                .setPlaceholder("Podaj link do kanału na którm streamujesz")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                            const applyStreamerRP = new TextInputBuilder()
                                .setCustomId('applyStreamerRP')
                                .setLabel("Jaką postać u nas odgrywasz?")
                                .setPlaceholder("Opowiedz nam o swoim RP, co u nas odgrywasz?")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                            const applyStreamerSteam = new TextInputBuilder()
                                .setCustomId('applyStreamerSteam')
                                .setLabel("Podaj link do twojego profilu steam")
                                .setPlaceholder("https://steamcommunity.com/id/steamid")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                            
                            const applyStreamerFirstRow = new ActionRowBuilder().addComponents(applyStreamerChannel);
                            const applyStreamerSecondRow = new ActionRowBuilder().addComponents(applyStreamerRP);
                            const applyStreamerThirdRow = new ActionRowBuilder().addComponents(applyStreamerSteam);
    
                            applyStreamerModal.addComponents(applyStreamerFirstRow, applyStreamerSecondRow, applyStreamerThirdRow);
                            await interaction.showModal(applyStreamerModal);
                        break;
            };
        }
    }
}
