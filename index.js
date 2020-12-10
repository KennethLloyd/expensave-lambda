const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('./db/dynamoose');

const app = express();

app.use(express.json());
app.use(cors());

require('./routers')(app);

module.exports.handler = serverless(app);
