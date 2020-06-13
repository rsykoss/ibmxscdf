const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://zonghan:JMHOJt94BvR3SmiC@zonghan-cbinx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

module.exports = {
    mongoose,
}