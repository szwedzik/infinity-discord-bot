const { model, Schema } = require('mongoose');

module.exports = model(
    'Ticket',
    new Schema({
        GuildId: String,
        MemberID: String,
        TicketID: Number,
        ChannelID: String,
        Closed: Boolean,
        Locked: Boolean,
        Type: String,
    })
);