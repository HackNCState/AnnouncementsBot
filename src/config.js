// config.js

require('dotenv').config(); 

const config = {
    discordBotToken: process.env.DISCORD_BOT_TOKEN, 
    announcementsChannelID: '1292982632845676575',
    googleAPIKeyFile: './src/discordannouncementsbot-37dea61d1483.json',
    sheetsID: '18k0aFirAUMHFZ10agKB55lnfIkiXps4TW21pKY4q9oU', // this is only for test-run; change this with the actual link for sheets
};

module.exports = config;
