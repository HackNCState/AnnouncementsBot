// app.js

const config = require('./config'); 
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');
const { google } = require('googleapis');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


async function fetchData(auth, sheetsID) {

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = sheetsID; 
    const range = 'Sheet1!A2:J'; 

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
    
        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found in the sheet.');
            return [];
        }
    
        return rows.map(([date, time, type, title, description, location, eventTime, url, thumbnailURL, imageURL]) => ({
            date,
            time,
            type: Number(type), 
            title,
            description,
            location,
            eventTime,
            url,
            thumbnailURL,
            imageURL,
        }));
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function scheduleAnnouncements() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: config.googleAPIKeyFile, 
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const channel = await client.channels.fetch(config.announcementsChannelID);
        const announcements = await fetchData(auth, config.sheetsID);

        announcements.forEach(({ date, time, type, title, description, location, eventTime, url, thumbnailURL, imageURL }) => {
            
            const [hour, minute] = time.split(':').map(Number);

            schedule.scheduleJob({ year: new Date(date).getFullYear(), month: new Date(date).getMonth(), day: new Date(date).getDate(), hour, minute }, () => {
                
                // type 1 for plain text
                if (type == 1) {
                    let message = '';
                    if (title) {
                        message += `**${title}**`;
                        if (description) { message += `: ${description} `; }
                    } else if (description) { message += `${description} `; }
                    let locationTime = '';
                    if (location) { locationTime += `*${location}*`; }
                    if (eventTime) {
                        if (location) { locationTime += `, *${eventTime}*`; } 
                        else { ocationTime += `*${eventTime}*`; }
                    }
                    if (locationTime) { message += `[${locationTime}]`; }
                    
                    channel.send(message);
                } 

                // type 2 for embed message
                else if (type == 2) {
                    
                    const embed = new EmbedBuilder()
                        .setColor('#BC271B')
                        .setTitle(title)
                        .setDescription(description)

                    if (url) { embed.setURL(url); }                
                    if (thumbnailURL) { embed.setThumbnail(thumbnailURL); }                
                    if (imageURL) { embed.setImage(imageURL); }

                    const fields = [];
                    if (location) { fields.push({ name: 'Location', value: location, inline: true }); }
                    if (time) { fields.push({ name: 'Time', value: time, inline: true }); }
                    if (fields.length > 0) { embed.addFields(fields); }
                    
                    channel.send({ embeds: [embed] });
                }
            });

            console.log(`Scheduled announcement: "${title}" on ${date} at ${time}`);
        });

    } catch (error) {
        console.error('Error scheduling announcements:', error);
    }
}


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    scheduleAnnouncements();
});

client.login(config.discordBotToken);
