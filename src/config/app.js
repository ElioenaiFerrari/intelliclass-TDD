require('dotenv/config');
require('module-alias/register');
require('@/config/database')(process.env.DATABASE_URL);
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('../modules/user/routes')(app);
app.use(morgan('dev'));
app.use(cors({ origin: true }));

module.exports = app;
