import axios from "axios";
const request = require('request');

// trending api
var url = 'https://newsapi.org/v2/top-headlines?q=cryptocurrency&' +
					'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd';
// url for referrence
var favoriteNews = 'https://newsapi.org/v2/everything?q=cryptocurrency&domains=cnbc.com,ccn.com&' +
'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd';
// url for referrence
var newsTopics = 'https://newsapi.org/v2/everything?q=nba,bitcoin&language=en&' +
'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd';

export default {
	news: function() {
		return axios.get(url);
	},
	
	favoriteNews: function() {
		return axios.get(favoriteNews);
	},
	newsTopics: function() {
		return axios.get(newsTopics);
	}
}