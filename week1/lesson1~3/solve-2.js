var rect = require('./rectangle-2');

function solveRect(l,b) {

    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    rect(l, b, function(error, rect){
        if(error){
            console.log(error.message);
        }else{
            console.log("The area of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + rect.area());
            console.log("The perimeter of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + rect.perimeter());
        }
    });

}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);