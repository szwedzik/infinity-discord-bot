const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("whitelist")
    .setDescription("test")
    .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
    .addSubcommand((options) => options
        .setName("check")
        .setDescription("Sprawdź czy gracz jest na whitelist")
        .addStringOption((option) => option
            .setName("steamid")
            .setDescription("Podaj SteamID gracza")
            .setRequired(true)
        )
    )
    .addSubcommand((options) => options
        .setName("add")
        .setDescription("Dodaj gracza na whitelist")
        .addStringOption((option) => option
            .setName("steamid")
            .setDescription("Podaj SteamID gracza")
            .setRequired(true)
        )
    )
    .addSubcommand((options) => options
        .setName("remove")
        .setDescription("Usuń gracza z whitelist")
        .addStringOption((option) => option
            .setName("steamid")
            .setDescription("Podaj SteamID gracza")
            .setRequired(true)
        )
    ),

}