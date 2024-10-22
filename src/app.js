
const config = require('./config'); 

const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const csvReader = require('./utils/csvReader');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    try {
        const channel = await client.channels.fetch(config.announcementsChannelID);

        csvReader.readAnnouncements(config.announcementsFile).then(announcements => {
            announcements.forEach(({ date, time, message }) => {
                const [year, month, day] = date.split('-').map(Number); 
                const [hour, minute] = time.split(':').map(Number);    

                const scheduleDate = new Date(year, month - 1, day, hour, minute);

                schedule.scheduleJob(scheduleDate, () => {
                    channel.send(message);
                    console.log(`Sent message: "${message}" at ${scheduleDate}`);
                });

                console.log(`Scheduled: "${message}" at ${scheduleDate}`);
            });
        }).catch(console.error);
    } catch (error) {
        console.error("Error fetching channel or sending message:", error);
    }
});

client.login(config.discordBotToken);
