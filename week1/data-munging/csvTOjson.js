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
    let header = [];
    let year, primaryType, description, arrest;
    const finalData = {};
    const finalArrestData = {};

    rl.on('line', (line) => { // Read CSV File to create crimeJson and  assault crime result arrested or not.
        if (isHeader) {
            isHeader = false;
            header = line.split(',');
            year = header.indexOf('Year');
            primaryType = header.indexOf('Primary Type');
            description = header.indexOf('Description');
            arrest = header.indexOf('Arrest');
        } else {
            const row = line.split(',');
            let obj = {};
            let obj1 = {};

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

            if (row[primaryType] === 'ASSAULT' &&
                (row[year] >= '2001' && row[year] <= '2018')) {
                if (row[arrest] == 'true') {
                    if (finalArrestData[row[year]]) {
                        finalArrestData[row[year]]['arrested']++;
                    } else {
                        obj1['arrested'] = 1;
                        obj1['notArrested'] = 0;
                        finalArrestData[row[year]] = obj1;
                    }

                } else {
                    if (finalArrestData[row[year]]) {
                        finalArrestData[row[year]]['notArrested']++;
                    } else {
                        obj1['arrested'] = 0;
                        obj1['notArrested'] = 1;
                        finalArrestData[row[year]] = obj1;
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
        fs.writeFile('./data/output/crimeAssaultJson.json', JSON.stringify(finalArrestData), (error) => {
            if (error) throw error;
            console.log('Saved!');
            console.timeEnd('Data Muning 2');
        });
    });
    
})(require);