const fs = require('fs');
const csv = require('csv-parser');

function readAnnouncements(filePath) {
    return new Promise((resolve, reject) => {
        const announcements = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                announcements.push({
                    date: row.date,
                    time: row.time,
                    message: row.message
                });
            })
            .on('end', () => {
                resolve(announcements);
            })
            .on('error', reject);
    });
}

module.exports = { readAnnouncements };
