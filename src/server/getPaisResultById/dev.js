'use strict'
const cheerio = require('cheerio')
const axios   = require('axios');
const config  = require('../../../config/app.metadata');

async function handler(event) {
  let responseBody = "";
  let statusCode = 0;

  if (!isRequestParamsValid(event.pathParameters)) {
    statusCode = 400;
    responseBody = 'Missing valid path parameter id.';
  } else {
    const { id } = event.pathParameters;

    try {
      const result = await crawlData(id);
      responseBody = JSON.stringify(result);
      statusCode = 200;
    } catch (err) {
      statusCode = 500;
      responseBody = JSON.stringify(err);
    }
  }

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };
}

function isRequestParamsValid(params) {
  const { id } = params;

  if (id === 'last') {
    return true;
  }
  if (!!id && (Number.isInteger(Number(id)) && Number(id) > 0)) {
    return true;
  }
  return false;
}

function getCrawlUrl(id) {
  let crawlUrl = `${config.paisMetadata.endpoint}?fromIndex=0&amount=1`;
  if (Number(id) > 0) {
    crawlUrl += `&fromNumber=${id}&toNumber=${id}`;
  }
  return crawlUrl;
}

async function crawlData(id) {
  const crawlUrl = getCrawlUrl(id);
  const response = await axios.get(crawlUrl);
  const $ = cheerio.load(response.data, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: false
  });

  const result = {pais: true};

  // Lotery ID
  const lotterEl = $('.archive_list_block.lotto_number > div').last();
  result.lotteryId = lotterEl[0].children[0].data;

  // Date time
  let dateTimeParts = [];
  $('.archive_list_block.date > div').each((ix, el) => {
    let value = el.children[0].data.trim();
    if (!!value) {
      if (/\d{2}\/\d{2}\/\d{2}/.test(value)) {
        value = value.match(/\d{2}\/\d{2}\/\d{2}/)[0]
          .replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        dateTimeParts.push(value);
      }
      if (/\d{2}:\d{2}/.test(value)) {
        dateTimeParts.push(value);
      }
    }
  });
  result.timestamp = Date.parse(dateTimeParts.join(' '));

  // Strong number
  const strongEl = $('.archive_list_block.strong_number .strong > div')[2];
  result.strong = strongEl.children[0].data;

  // Regular numbers
  const regularParts = [];
  $('.archive_list_block.numbers li.loto_info_num').each((ix, el) => {
    regularParts.push(el.children[1].children[0].data);
  });
  result.regular = regularParts;

  return result;
}

async function main() {
  const response = await handler({
    pathParameters: { id: 'last' }
  });

  console.log(response);
}

main();
