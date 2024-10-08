const fs = require('fs');
const csv = require('csv-parser');

function readAnnouncements(file) {
    const announcements = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
          .pipe(csv())
          .on('data', (row) => announcements.push(row))
          .on('end', () => resolve(announcements))
          .on('error', reject);
    });
}

module.exports = { readAnnouncements };
