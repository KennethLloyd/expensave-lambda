const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

require('./db/dynamoose');
require('./routers')(app);

module.exports.handler = serverless(app);
