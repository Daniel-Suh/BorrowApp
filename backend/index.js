// require (imports)
const express = require("express");
const stripe = require("stripe")("sk_test_RIEAJGcwrA7GwhdMunctWAmm");
const bodyParser = require("body-parser");
//const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
// define vars
var app = express();

app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// enable CORS on /list route only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// Load in the pictures on the initial page with the four images of options to choose
app.get('/', (req, res) => {
    const data = [
        {type: "Bike", image_url: "https://i.pinimg.com/originals/c5/6e/be/c56ebed6c368d900b30bded63548280e.gif"},
        {type: "Scooter", image_url: "http://worldartsme.com/images/scooter-free-clipart-1.jpg"},
        {type: "Phone Charger", image_url: "https://kiesub.com/wp-content/uploads/2015/06/CEL-CHGMICRO.jpg"},
        {type: "Calc u Later", image_url: "https://www.schoolmart.com/site/wp-content/uploads/2016/04/ti84plus_hi.jpg"},
    ];
    res.send(data);
})
app.get('/', (req, res) => {
    const logo = [
        {type: "Logo", image_url: "https://imgur.com/a/IsUzjKX"},
    ];
    res.send(logo);
})
app.post('/charge', function(req, res){
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    console.log('asdf');
    return stripe.charges.create({
        amount: chargeAmount,
        currency: "usd",
        source: token
    }, function(err, charge){
        if(err) {
            if(err.type === "StripeCardError"){
            console.log("Your Card was declined");
            }
            return res.redirect('http://localhost:63622/payfailed.html').send(err);
        }
        return res.redirect('http://localhost:63622/paysuccess.html').send(charge);
    });
});

// exports
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));