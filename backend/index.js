var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require("method-override")

const User = require('./models/user.js');
const Incident = require('./models/incident.js');

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

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  console.log('ping ' + chatId)
  let user = await User.findOne({ telegramId: String(chatId) }).exec();
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
        // bot.sendMessage(chatId, 'Very good.');
        break;
      case 'Neutral':
        // bot.sendMessage(chatId, 'Okay.');
        break;
      default:
      // user.telegramState = 'Add Locations';
      // await user.save();
      // bot.sendMessage(chatId, 'Received your message');
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
      bot.sendMessage(chatId, 'Send a location where you would like to receive notifications for.');
    } else {
      console.log('placeholder user not found')
    }
  }

});

// Matches "/echo [whatever]"
bot.onText(/\/help (.+)/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  console.log('hello')

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  console.log(resp)

  let incident = await Incident.findById(resp).populate('responders').lean();
  if (!incident) {
    bot.sendLocation(chatId, 1.4384, 103.8025);
    // bot.sendMessage(chatId, 'No incident found.');
  } else {
    let user = await User.findOne({ telegramId: String(chatId) }).exec();
    user.telegramState = 'Responding';
    user.incident = incident
    user.save();
    Incident.findOneAndUpdate(
      { _id: incident._id },
      { $addToSet: { responders: user._id } },
      {
        returnNewDocument: true
      }, function (error, profile) {
      });

    // await bot.sendLocation(chatId, incident.location.latitude, incident.location.longitude);

    bot.sendMessage(chatId, "#" + incident._id + ": " + "Remember to /resolve after reaching the destination and when no further help from other volunteers is needed. In case of emergency, call 995.", {
      "reply_markup": {
        "keyboard": [["/resolve"]]
      }
    });

    let usersString = ''
    incident.responders.map(r => {
      if (r.name != user.name) {
        usersString += '@' + r.name + ' '
      }
    })

    let idleUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: user._id },
          telegramState: 'Neutral',
          locations: {
            $elemMatch: {
              latitude: {
                $gt: incident.location.latitude - 2 / 55,
                $lt: incident.location.latitude + 2 / 55
              },
              longitude: {
                $gt: incident.location.longitude - 2 / 55,
                $lt: incident.location.longitude + 2 / 55
              }
            }
          }
        }
      }]
    )


    idleUsers.forEach(u => {
      bot.sendMessage("#" + incident._id + ': ' + u.telegramId, (incident.responders.length + 1) + " volunteers responding to Case " + incident._id);
    })

    let searchingUsers = await User.find({
      _id: { $ne: user._id },
      incident: incident._id,
    })

    searchingUsers.forEach(u => {
      bot.sendMessage("#" + incident._id + ': ' + u.telegramId, "@" + user.name + " has joined you in responding to Case " + incident._id);
    })
    if (usersString != '') {
      bot.sendMessage(chatId, "#" + incident._id + ': ' + 'Go help granny with ' + usersString + '!');
    }
  }
  // send back the matched "whatever" to the chat
});

bot.onText(/\/resolve/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('hellooo')

  let user = await User.findOne({ telegramId: String(chatId) }).exec();
  console.log('pint')

  if (user) {
    let incident = await Incident.findById(user.incident);
    let nearbyUsers = await User.aggregate([
      {
        $match: {
          locations: {
            $elemMatch: {
              latitude: {
                $gt: incident.location.latitude - 2 / 55,
                $lt: incident.location.latitude + 2 / 55
              },
              longitude: {
                $gt: incident.location.longitude - 2 / 55,
                $lt: incident.location.longitude + 2 / 55
              }
            }
          }
        }
      }]
    )

    console.log(nearbyUsers);

    nearbyUsers.forEach(u => {
      bot.sendMessage(u.telegramId, 'Case #' + user.incident + ' has been resolved.');
    })

    let incidentId = String(user.incident);

    User.updateMany({ incident: incidentId }, {
      incident: null,
      telegramState: 'Neutral',
    }, (err) => { });

    Incident.findOneAndUpdate({ _id: incidentId }, {
      resolvedAt: new Date(),
      resolvedBy: user
    }, {
      returnNewDocument: true
    }, function (error, profile) {
    });

  }
});

bot.onText(/\/locations/, async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ telegramId: String(chatId) }).exec();
  console.log('pint')
  if (user) {
    user.telegramState = 'Add Locations';
    user.save();
    bot.sendMessage(chatId, 'Send a location where you would like to receive notifications for.');
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
  console.log("Hello World");
});
