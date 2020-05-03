const fs = require('fs');
const parse = require('csv-parse');
var inputFile='eventsFile.csv';
console.log("Processing trial file");
var parser = parse({delimiter: ','}, function (err, data) {
   console.log(data);
   data.forEach(function(line) {
      console.log(line);
     // create country object out of parsed fields
     var obj = { "name" : line[0]
                   , "num" : line[1]
                   , "add" : line[2]
                   
                   };
    console.log(JSON.stringify(obj));
   });    
});

// read the inputFile, feed the contents to the parser
fs.createReadStream('eventsFile.csv').pipe(parser);