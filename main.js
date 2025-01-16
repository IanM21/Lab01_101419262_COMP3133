const csv = require('csv-parser');
const fs = require('fs');

const filePath = 'input_countries.csv';

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

// Delete canada.txt and usa.txt files if they exist
fs.unlink('canada.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Canada.txt deleted');
});

fs.unlink('usa.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('USA.txt deleted');
});

// filter canadian data and write to canada.txt (we will need to make this file as we deleted it above)
fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            fs.appendFile('canada.txt', JSON.stringify(row) + '\n', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        } else if (row.country === 'United States') {
            fs.appendFile('usa.txt', JSON.stringify(row) + '\n', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    });