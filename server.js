var path = require('path');
var serveStatic = require('serve-static')
var express = require('express');

const app = express();

var staticPath = path.join(__dirname, 'public')
app.use(serveStatic(staticPath, {'index': ['index.html']}))

var server = app.listen(process.env.PORT || 3000, () => {
    console.log(`serving ${staticPath} on ${server.address().port}`);
})

module.exports = app;
