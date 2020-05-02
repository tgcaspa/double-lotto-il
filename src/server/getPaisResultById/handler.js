'use strict'
const axios   = require('axios');
const cheerio = require('cheerio')
const config  = require('./config/app.metadata');

module.exports.index = async event => {
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
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
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

  const result = { pais: true };

  // Lotery ID
  const lotterEl = $('.archive_list_block.lotto_number > div').last();
  const lotteryValue = lotterEl[0].children[0].data;
  result.lotteryId = Number(lotteryValue);

  // Date time
  let dateTimeParts = [];
  $('.archive_list_block.date > div').each((ix, el) => {
    let dateTimeValue = el.children[0].data.trim();
    if (!!dateTimeValue) {
      if (/\d{2}\/\d{2}\/\d{2}/.test(dateTimeValue)) {
        dateTimeValue = dateTimeValue.match(/\d{2}\/\d{2}\/\d{2}/)[0]
                     .replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        dateTimeParts.push(dateTimeValue);
      }
      if (/\d{2}:\d{2}/.test(dateTimeValue)) {
        dateTimeParts.push(dateTimeValue);
      }
    }
  });
  result.timestamp = Date.parse(dateTimeParts.join(' '));

  // Strong number
  const strongEl = $('.archive_list_block.strong_number .strong > div')[2];
  const strongValue = strongEl.children[0].data;
  result.strong = Number(strongValue);

  // Regular numbers
  const regularParts = [];
  $('.archive_list_block.numbers li.loto_info_num').each((ix, el) => {
    const regularValue = el.children[1].children[0].data;
    regularParts.push(Number(regularValue));
  });
  result.regular = regularParts;

  return result;
}
