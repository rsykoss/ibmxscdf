var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require("method-override")

const User = require('./models/user.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cors());

app.use(require("express-session")({
  secret: "confuciusisbae1971",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const TelegramBot = require('node-telegram-bot-api');
const token = '1238052481:AAF61uEvpaNyhKlFFg4TvOo3NSBM20BB1vI';
const bot = new TelegramBot(token, { polling: true });

// TELEGRAM BOT

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  console.log(msg)

  let user = await User.findOne({ telegramId: msg.chat.id });
  if (!user) {
    let placeholderUser = await User.findOne({ telegramId: msg.chat.id });
  }
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome. What's your account key?");
});

var debugRoutes = require("./routes/debug");
app.use('/debug', debugRoutes);
var iotRoutes = require("./routes/iot");
app.use('/iot', iotRoutes);

app.listen(process.env.PORT || 3001, function () {
  console.log("Hello");
});
