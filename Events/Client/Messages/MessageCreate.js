
module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Client} client 
     * @returns 
     */
    async execute(message, client) {
        if(message.channelId == 1076180354261585981){
            if(message.author.bot) return;
            message.delete();
        }
    }
}