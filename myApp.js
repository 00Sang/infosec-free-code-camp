const express = require("express");
const helmet = require("helmet");

 
const app = express();

// Apply Helmet as the first middleware
app.use(helmet.hidePoweredBy());
app.use(helmet({ frameguard: { action: 'deny'},})); // Ensure it's explicitly set
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({maxAge: 20 * 24 * 60 * 60, force: true }))
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow content only from your own site
      scriptSrc: ["'self'", "trusted-cdn.com"], // Allow scripts from your site and a trusted CDN
    },
  })
);


app.get("/", (req, res) => {
    res.send("Helmet Frameguard is working!");
});










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

