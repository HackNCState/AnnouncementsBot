// config.js

require('dotenv').config(); 

const config = {
    discordBotToken: process.env.DISCORD_BOT_TOKEN, 
    announcementsChannelID: process.env.CHANNEL_ID,
    googleAPIKeyFile: process.env.SERVICE_ACC_AUTH_PATH,
    sheetsID: process.env.SHEETS_ID,
};

module.exports = config;
