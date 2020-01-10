'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode;

  const body = JSON.parse(event.body);

  const queryParams = {
    TableName: 'dblottoil-results',
    Item: {
      id: body.id,
      lotteryId: body.lotteryId,
      pais: false,
      regular: body.regular,
      strong: body.strong,
      timestamp: body.timestamp,
      user: {
        passport: body.user.passport,
        phone: body.user.phone
      }
    }
  };

  try {
    const data = await documentClient.put(queryParams).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put results: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
}
