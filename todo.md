### The problem:

Joe wants to send <20 bitcoin> to each of his three kids none of which have a bitcoin wallet. They have each requested that he send them coin in their favorite currencies:
<Ethereum>, <Litecoin>, and <DASH>.

Joe wants to get the best rates possible when he converts the coins to give his children. Write a web app that will find out what the best exchanges would be for each of these trades. The app should talk to two exchange (some suggestions: BTC-E, Poloniex, Bittrex) api's to get real data. Please use ES7/ES8 style node js.

The results should display what the exchange rate is at all the exchanges for each of the 3 trades Joe want do and highlight which is the best rate at each.

Other considerations:
For backend or full stack dev applicants:
    Please complete the challenge using Nodejs.  
    Can simply print out results in console log.

Extra points for:
tracking results over time
integrating data from more exchanges
display how much more Joe will get when he makes each trade at exchange A vs exchange B
make results accessible via an api
display results in web page


## The plan:

endpoints:

coin/getBestRate?market=<coin_pair> //ex: BTC_LTE
  1. ~~create js class to format data~~
  1. ~~get prices from:
    - https://bittrex.com/api/v1.1/public/getticker?market=<type> // will need to call per currency pair
    - https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_NXT&depth=10 // will need to call per currency~~        
  1. ~~convert API results into Currency Classes~~
  1. ~~compare rates~~
  1. ~~route that takes a currency, return best rate and which exchange to get it from~~
