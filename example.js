var jux = require('./index.js');
var fs = require('fs');

fs.readFile('./example.md', 'utf-8', function(err, source) {
    var data = jux.parse(source);
    console.log(JSON.stringify(data, null, 4));
});