require('dotenv').config(); 

const config = {
    discordBotToken: process.env.DISCORD_BOT_TOKEN, 
    announcementsFile: './src/events/test.csv', 
    announcementsChannelID: '1292982632845676575',
};

module.exports = config;
