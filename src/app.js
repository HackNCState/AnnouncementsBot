
const config = require('./config'); 

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');
const csvReader = require('./utils/csvReader');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    try {
        const channel = await client.channels.fetch(config.announcementsChannelID);

        csvReader.readAnnouncements(config.announcementsFile).then(announcements => {
            announcements.forEach(({ date, time, type, title, description, location, eventTime, url, thumbnailURL, imageURL }) => {
                const [hour, minute] = time.split(':').map(Number);
                
                schedule.scheduleJob({ year: new Date(date).getFullYear(), month: new Date(date).getMonth(), day: new Date(date).getDate(), hour, minute }, () => {
                    
                    // type 1 for normal plain text message
                    if (type == 1) { 
                        channel.send(`${title}: ${description}. [${location}, ${eventTime}]`);
                    }

                    // type 2 for embed messages
                    else if (type == 2) { 
                        const embed = new EmbedBuilder()
                        .setColor('#BC271B')
                        .setURL(url)
                        .setTitle(title)
                        .setDescription(description)
                        .setThumbnail(thumbnailURL)
                        .addFields(
                            { name: 'Location', value: location, inline: true },
                            { name: 'Time', value: eventTime, inline: true }
                        )
                        .setImage(imageURL);
                        channel.send({ embeds: [embed] });
                    }

                });
            });
        }).catch(console.error);

    } catch (error) {
        console.error("Error fetching channel or sending message:", error);
    }
});

client.login(config.discordBotToken);
