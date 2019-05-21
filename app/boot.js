const mongoose = require('mongoose');
const configs = require('../configs/index');

mongoose.connect(configs.database.db_host, {useNewUrlParser: true, useCreateIndex: true});

var db = mongoose.connection;
db.on('open', () => {
    console.log('database connected');
});

db.on('error', console.error.bind(console, 'database connect failed'));