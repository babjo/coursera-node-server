var mongoose = require('mongoose'),
    assert = require('assert');

mongoose.Promise = global.Promise;

var Dishes = require('./dishes-1');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected correctly to server");

    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    newDish.save(function (err) {
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the users
            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});