var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require("method-override")

const User = require('./models/user.js');

const { mongoose, bot } = require('./config/mongoose')


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
  console.log('ping ' + chatId)
  let user = await User.findOne({ telegramId: String(chatId) }).exec();

  console.log(user)
  if (user) {
    console.log('user found')
    switch (user.telegramState) {
      case 'Add Locations':
        if (msg.location) {
          user.locations.push({ latitude: msg.location.latitude, longitude: msg.location.longitude });
          await user.save();
          bot.sendMessage(chatId, 'Location saved. Add more locations, or send /done to move on with life.');
        }
        break;
      case 'Responding':
        bot.sendMessage(chatId, 'Very good.');
        break;
      case 'Neutral':
        bot.sendMessage(chatId, 'Okay.');
        break;
      default:
        user.telegramState = 'Add Locations';
        await user.save();
        bot.sendMessage(chatId, 'Received your message');
    }
  } else {
    console.log('user not found')
    // send a message to the chat acknowledging receipt of their message
    let placeholderUser = await User.findOne({ accountKey: msg.text });
    if (placeholderUser) {
      console.log('placeholder user found')
      placeholderUser.telegramId = chatId;
      placeholderUser.telegramState = 'Add Locations';
      if (msg.chat.username) placeholderUser.name = msg.chat.username;
      await placeholderUser.save();
      await bot.sendMessage(chatId, 'Hello, ' + msg.chat.username + '. Your account has been tagged to NRIC ' + placeholderUser.nric);
      bot.sendMessage(chatId, 'Send a location where you would like to receive help requests for.');
    } else {
      console.log('placeholder user not found')
      bot.sendMessage(chatId, 'Invalid account key');
    }
  }

});

bot.onText(/\/locations/, async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ telegramId: String(chatId) }).exec();
  console.log('pint')
  if (user) {
    user.telegramState = 'Add Locations';
    user.save();
    bot.sendMessage(chatId, 'Send a location where you would like to receive help requests for.');
  }
});

bot.onText(/\/done/, async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ telegramId: String(chatId) }).exec();

  if (user) {
    switch (user.telegramState) {
      case 'Add Locations':
        user.telegramState = 'Neutral';
        user.save();
        await bot.sendMessage(chatId, 'You are now volunteering for the following locations.');
        user.locations.forEach(l => {
          bot.sendLocation(chatId, l.latitude, l.longitude);
        })
        break;
      case 'Responding':
        bot.sendMessage(chatId, 'Very good.');
        break;
      case 'Neutral':
        bot.sendMessage(chatId, 'Okay.');
        break;
      default:
        bot.sendMessage(chatId, 'Received your message');
    }
  }
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
