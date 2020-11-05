var path = require('path');
var serveStatic = require('serve-static');
var express = require('express');

const app = express();

app.get('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] != 'https') {
    res.redirect(302, `https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});
var staticPath = path.join(__dirname, 'public');
app.use(serveStatic(staticPath, {'index': ['index.html']}));

var server = app.listen(process.env.PORT || 3000, () => {
    console.log(`serving ${staticPath} on port ${server.address().port}`);
});
