const fs = require('fs');
const csv = require('csv-parser');

exports.readAnnouncements = async (filePath) => {
    const announcements = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                announcements.push({
                    date: row.date.trim(),
                    time: row.time.trim(),
                    type: row.type.trim(),
                    title: row.title.trim(),
                    description: row.description.trim(),
                    location: row.location.trim(),
                    eventTime: row.eventTime.trim(),
                    url: row.url.trim(),
                    thumbnailURL: row.thumbnailURL.trim(),
                    imageURL: row.imageURL.trim()
                });
            })
            .on('end', () => resolve(announcements))
            .on('error', (err) => reject(err));
    });
};
