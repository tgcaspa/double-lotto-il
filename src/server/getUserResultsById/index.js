'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const documentClient = new AWS.DynamoDB.DocumentClient();

  const queryParams = {
    TableName: 'dblottoil-results',
    Key: {
      id: event.pathParameters.id
    }
  };

  try {
    const data = await documentClient.get(queryParams).promise();

    if ('Item' in data) {
      responseBody = JSON.stringify(data.Item);
      statusCode = 200;
    } else {
      statusCode = 404;
    }
  } catch (err) {
    responseBody = `Unable to get results: ${err}`;
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
