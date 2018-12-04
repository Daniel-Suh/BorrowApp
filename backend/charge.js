//Publishable : pk_test_Etb6Rcs8OaFUK5JVgoWA4MAL
//Secret : sk_test_RIEAJGcwrA7GwhdMunctWAmm

const express = require("express");
const stripe = require("stripe")("sk_test_RIEAJGcwrA7GwhdMunctWAmm");
//const hbs = require("hbs");
const bodyParser = require("body-parser");

var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index', {
    });
});

app.get('/paysuccess', function(req, res){
    res.render('paysuccess', {
    });
});

app.post('/charge', function(){

})

app.listen(3000, function(){
    console.log("Stripe is Running");
})
