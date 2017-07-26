// importing modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet');

// Importing the express module under the `app` variable
const app = express();

global.appServer = app;

/* If the user is local development import the .env file, else do not load the
.env file. Also if production is set start newrelic for monitoring*/
if (app.get('env') === 'development') {
  /* eslint-disable global-require */
  require('dotenv').config();
} else if (app.get('env') === 'production') {
  // Import the NewRelic Module.
  require('newrelic');
} else {
  console.log('Please set your NODE_ENV to either `development` or `production`');
}

// Importing the favicon, remove if you do not have one.
app.use(favicon(`${__dirname}/lib/public/favicon.ico`));

// Added further layer of security
app.use(helmet());

// Importing all routes to the server
const authenticatedRoutes = require('./lib/routes/authenticated-routes');
const contentful = require('contentful');
const utilities = require('./lib/web/Utilities');
const cfHelpers = require('./lib/web/global_variables');

// Configure the express app
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

const cfClient = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACEID,
  // This is the access token for this space.
  // Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
  agent: utilities.createProxyAgent(),
});
// put instance of contentful client in global variables
global.cfClient = cfClient;

// set the locale in which we are currently viewing the application
global.appLocale = 'en-US';

// compress all routes
app.use(compression());

// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'lib/public')));

app.all('/*', function(req, res, next) {
  next();
  cfHelpers.GetGlobalEntriesAppData();
});

// Load authenticated routes
app.use('/', authenticatedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stck trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
