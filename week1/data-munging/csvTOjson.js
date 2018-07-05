// PART - 1 (Data Muning)
// 1. Read the file
// 2. Break the file
// 3. Extra the header row
// 4. Filter and aggregate the data and store somewhere
// 5. Convert the data into Json
// 6. Write the Json back to a file
// 7. Json output sample
// 1. sample
// [
//     {
//         "year": "2001",
//         "theftOver500": "200",
//         "theftUnder500": "100"
//     },
//     {
//         "year": "2001",
//         "theftOver500": "200",
//         "theftUnder500": "100"
//     }
// ]
// 2. sample
// {
//     "2001": {
//         "theftOver500": "200",
//         "theftUnder500": "100"
//     },
//     "2018": {
//         "theftOver500": "200",
//         "theftUnder500": "100"
//     }
// }

// PART - 2 (Data Visualization) (Using d3.js)

// 1. Read the file.

(function (require){
    console.time("Data Muning 1");
    console.time("Data Muning 2");
    const fs = require('fs');
    const readLine = require('readline');

    const csvData = fs.createReadStream('./data/input/crimeCsv.csv');
    const rl = readLine.createInterface({
        input: csvData
    });

    let isHeader = true;
    let isHeaderRow = true;
    let header = [];
    let headerRow = [];
    let year, primaryType, description, arrest;
    const finalData = {};
    const finalArrestData = {};

    rl.on('line', (line) => { // Read CSV File to create crimeJson which is going hold theft $500 under and above
        if (isHeader) {
            isHeader = false;
            header = line.split(',');
            year = header.indexOf('Year');
            primaryType = header.indexOf('Primary Type');
            description = header.indexOf('Description');
        } else {
            const row = line.split(',');
            let obj = {};

            // filteration
            if (row[primaryType] === 'THEFT' &&
                (row[year] >= '2001' && row[year] <= '2018')) {

                if (row[description] === 'OVER $500') {
                    if (finalData[row[year]]) {
                        finalData[row[year]]['theftOver500']++;
                    } else {
                        obj['theftOver500'] = 1;
                        obj['theftUnder500'] = 0;
                        finalData[row[year]] = obj;
                    }

                } else if (row[description] === '$500 AND UNDER') {
                    if (finalData[row[year]]) {
                        finalData[row[year]]['theftUnder500']++;
                    } else {
                        obj['theftOver500'] = 0;
                        obj['theftUnder500'] = 1;
                        finalData[row[year]] = obj;
                    }
                }
            }
        }
        
    }).on('close', () => { // Write Json File for crimeJson which contains theft $500 under and above
        fs.writeFile('./data/output/crimeJson.json', JSON.stringify(finalData), (error) => {
            if (error) throw error;
            console.log('Saved!');
            console.timeEnd('Data Muning 1');
        });
    });

    rl.on('line', (line) => { // Read CSV File to create crimeAssaultJson which is going hold Assault crime result arrested or not
        if (isHeaderRow) {
            isHeaderRow = false;
            headerRow = line.split(',');
            year = headerRow.indexOf('Year');
            arrest = headerRow.indexOf('Arrest');
        } else {
            const row = line.split(',');
            let obj = {};

            // filteration
            if (row[primaryType] === 'ASSAULT' &&
                (row[year] >= '2001' && row[year] <= '2018')) {
                if (row[arrest] == 'true') {
                    if (finalArrestData[row[year]]) {
                        finalArrestData[row[year]]['arrested']++;
                    } else {
                        obj['arrested'] = 1;
                        obj['notArrested'] = 0;
                        finalArrestData[row[year]] = obj;
                    }

                } else {
                    if (finalArrestData[row[year]]) {
                        finalArrestData[row[year]]['notArrested']++;
                    } else {
                        obj['arrested'] = 0;
                        obj['notArrested'] = 1;
                        finalArrestData[row[year]] = obj;
                    }
                }
            }
        }
        
    }).on('close', () => { // Write Json File for crimeAssaultJson which contains Assault crime result arrested or not
        fs.writeFile('./data/output/crimeAssaultJson.json', JSON.stringify(finalArrestData), (error) => {
            if (error) throw error;
            console.log('Saved!');
            console.timeEnd('Data Muning 2');
        });
    });
})(require);