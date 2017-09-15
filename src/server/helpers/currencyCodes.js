// TODO - make module that pulls from https://bittrex.com/api/v1.1/public/getcurrencies

const currencyCodeToNameMap = new Map();
currencyCodeToNameMap.set('ETH', 'Etherium');
currencyCodeToNameMap.set('LTC', 'Litecoin');
currencyCodeToNameMap.set('DASH', 'Dash');
currencyCodeToNameMap.set('BTC', 'Bitcoin');

module.exports = currencyCodeToNameMap;
