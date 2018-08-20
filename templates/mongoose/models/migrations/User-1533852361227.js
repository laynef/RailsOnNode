var mongoose = require('mongoose');
var User = require('../User.js');

// manipulate your data here
User.find().exec()
    .then(results => {
        console.log(results);
        mongoose.connection.close();
    });
