// config.js

require('dotenv').config(); 

const config = {
    discordBotToken: process.env.DISCORD_BOT_TOKEN, 
    announcementsChannelID: '',
    announcementsRoleID: '',
    googleAPIKeyFile: '',
    sheetsID: '', 
};

module.exports = config;
