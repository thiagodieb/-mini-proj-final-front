const express = require('express'),
   path = require('path'),
   fs = require('fs');
const compression = require('compression');
const app = express();
const staticRoot = __dirname;

let PORT = process.env.PORT || 3000;

app.use(compression());
app.use(function(req, res, next) {
    if (req.accepts('html') !== 'html') {
        return next();
    }
    if (path.extname(req.path) !== '') {
        return next();
    }
    res.set({'content-type': 'text/html; charset=utf-8'});
    fs.createReadStream(`${staticRoot}/index.html`).pipe(res);
});

app.use(express.static(staticRoot));

app.listen(PORT, function() {
    console.log(`app running on: http://localhost:${PORT}`);
});
