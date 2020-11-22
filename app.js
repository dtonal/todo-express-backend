const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

require('dotenv').config()

const todoRouter = require('./routes/todo');
const dbConnection = require('./db/dbconnection');

const app = express();

const port = 5000
// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//config 0-auth

const auth0Domain = process.env.AUTH0_DOMAIN
const apiIdentifier = process.env.API_IDENTIFIER

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://' + auth0Domain + '/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: apiIdentifier,
    issuer: 'https://' + auth0Domain + '/',
    algorithms: ['RS256']
});

app.use(checkJwt);

// setup routes
app.use('/todo', todoRouter);

dbConnection.init
    .then(app.listen(port))
    .then(console.log(`Todo Backend app listening at http://localhost:${port}`))

module.exports = app;
