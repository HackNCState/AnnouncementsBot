
const config = require('./config'); 

const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const csvReader = require('./utils/csvReader');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    const channel = await client.channels.fetch(config.announcementsChannelID); 
    // console.log(channel)
    
    csvReader.readAnnouncements(config.announcementsFile).then(announcements => {
        announcements.forEach(({ message, time }) => {
            const [hour, minute] = time.split(':').map(Number);
            schedule.scheduleJob({ hour, minute }, () => {
                channel.send(message);
            });
        });
    }).catch(console.error);

});

client.login(config.discordBotToken);
