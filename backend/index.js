// require (imports)
const express = require('express');
// define vars
const app = express();
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
// exports
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));