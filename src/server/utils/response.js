function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}

function success(body) {
  return buildResponse(200, body);
}

function failure(body) {
  return buildResponse(400, body);
}

module.exports = {
  success,
  failure
};
