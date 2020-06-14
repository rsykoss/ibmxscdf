const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://zonghan:JMHOJt94BvR3SmiC@zonghan-cbinx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

const TelegramBot = require('node-telegram-bot-api');
const token = '1227957179:AAH2LlBismPtuI0lC0KYVD5XhrhMAqq1VFY';
const token2 = '1161091303:AAH8-2bXl6LIN5aDXHUSAHOs7oGJ4Q_G6OY'

let prod = true;
// prod = false;

const bot = new TelegramBot(prod ? token2 : token, { polling: true });

module.exports = {
    mongoose, bot
}