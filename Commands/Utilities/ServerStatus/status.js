const {
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits, 
    SlashCommandBuilder,
    Client,
    GatewayIntentBits,
    ActivityType
} = require('discord.js');

const axios = require('axios');
const cron = require('node-cron');

const config = require('../../../config.json');
let messageId = "1058023350875734067";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("statussetup")
    .setDescription("Utwórz system statusu serwera.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const { guild } = interaction;
        const statusChannel = guild.channels.cache.get(config.RPStatus);

        const message = statusChannel.messages.fetch(messageId);
        if(message){
            cronSetup(messageId, statusChannel, client);
        } else {
            const statusEmbed = new EmbedBuilder()
            .setTitle("Status serwera")
            .setColor(0x000000)
            .addFields(
                {
                    name: "Kolejka",
                    value: "Wczytywanie...",
                    inline: true
                }, 
                {
                    name: "Godzina",
                    value: "Wczytywanie...",
                    inline: true
                },
                {
                    name: "Następny restart",
                    value: "Wczytywanie...",
                    inline: true
                }
            )

            await statusChannel.send({ embeds: [statusEmbed] }).then((msg) => {
                messageId = msg.id;
            });

            cronSetup(messageId, statusChannel, client);
        }

        await interaction.reply({ content: "Statusu serwera został uruchomiony.", ephemeral: true });
    }
}

function cronSetup(messageId, statusChannel, client){
    cron.schedule('*/60 * * * * *', () => {
        updateMessage(messageId, statusChannel, client);
    });
    
}

async function updateMessage(messageId, statusChannel, client){
    let nextRestart = "Wczytywanie...";
    let statusEmbedEdit;

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    if(currentHour >= 20 && currentHour < 24){
        nextRestart = "00:00";
    } else if(currentHour >= 16 && currentHour < 20){
        nextRestart = "20:00";
    } else if(currentHour >= 12 && currentHour < 16){
        nextRestart = "16:00";
    } else if(currentHour >= 8 && currentHour < 12){
        nextRestart = "12:00";
    } else if(currentHour >= 4 && currentHour < 8){
        nextRestart = "08:00";
    } else if(currentHour >= 0 && currentHour < 4){
        nextRestart = "04:00";
    }   

    await axios.get("https://api.infinityrp.pl/util/players-online.php?fullDisplay").then(async (res) => {
        
        if(res.data['status'] === "Online"){
            if(res.data['players'] >= res.data['slots'] && res.data['queue'] === "Active"){
                statusEmbedEdit = new EmbedBuilder()
                .setTitle("[PL] [RP] InfinityRP.pl [ POLSKI SERWER ROLEPLAY WL-OFF ]")
                statusEmbedEdit.setColor(0x00FF00)
                .addFields(
                    {
                        name: "Gracze",
                        value: `${res.data['players']}/${res.data['slots']}`,
                        inline: true
                    }, 
                    {
                        name: "Kolejka",
                        value: `${res.data['queue']}`,
                        inline: true
                    }, 
                    {
                        name: "Godzina",
                        value: `${res.data['time']}`,
                        inline: true
                    },
                    {
                        name: "Następny restart",
                        value: `${nextRestart}`,
                        inline: true
                    }
                )
                .setTimestamp()
                .setFooter({ text: "Ostatnia aktualizacja" })
            } else {
                statusEmbedEdit = new EmbedBuilder()
                .setTitle("[PL] [RP] InfinityRP.pl [ POLSKI SERWER ROLEPLAY WL-OFF ]")
                statusEmbedEdit.setColor(0x00FF00)
                .addFields(
                    {
                        name: "Gracze",
                        value: `${res.data['players']}/${res.data['slots']}`,
                        inline: true
                    },
                    {
                        name: "Godzina",
                        value: `${res.data['time']}`,
                        inline: true
                    },
                    {
                        name: "Następny restart",
                        value: `${nextRestart}`,
                        inline: true
                    }
                )
                .setTimestamp()
                .setFooter({ text: "Ostatnia aktualizacja" })
            }
        } else {
            statusEmbedEdit = new EmbedBuilder()
            .setTitle("[PL] [RP] InfinityRP.pl [ POLSKI SERWER ROLEPLAY WL-OFF ]")
            statusEmbedEdit.setColor(0xFF0000)
            .addFields(
                {
                    name: "Godzina",
                    value: `Offline`,
                    inline: true
                },
                {
                    name: "Następny restart",
                    value: `Offline`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: "Ostatnia aktualizacja" })
        }
        
        await statusChannel.messages.fetch(messageId).then((msg) => {
            msg.edit({ embeds: [statusEmbedEdit] });
        });
    });
    
}