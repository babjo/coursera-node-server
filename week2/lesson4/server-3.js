var mongoose = require('mongoose'),
    assert = require('assert');

mongoose.Promise = global.Promise;

var Dishes = require('./dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected correctly to server");

    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test',
        comments: [
            {
                rating : 3,
                comment : 'This is insane',
                author : 'Matt Daemon'
            }
        ]

    });

    // save the user
    newDish.save(function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function(err, dish){
                        console.log('Updated Comments');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});