'use strict'

const axios = require('axios');
const cheerio = require('cheerio');
const {config} = require("./config/server");
const {success, failure} = require("./utils/response");

module.exports.main = async event => {
  if (!isRequestParamsValid(event.pathParameters)) {
    return failure('Missing valid path parameter id.');
  }

  try {
    const responseBody = await crawlData(event.pathParameters.id);
    return success(responseBody);
  } catch (err) {
    return failure(err);
  }
}

function isRequestParamsValid(params) {
  if (!params || !('id' in params)) {
    return false;
  }
  if (params.id === 'last') {
    return true;
  }
  if (Number.isInteger(Number(params.id)) && Number(params.id) > 0) {
    return true;
  }
  return false;
}

function getCrawlUrl(id) {
  let crawlUrl = `${config.pais.endpoint}?fromIndex=0&amount=1`;
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
