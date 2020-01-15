const express = require('express');
const authRoutes = require('./routes/auth_routes');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/product');
const managerRoutes = require('./routes/manager');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const checkRoutes = require('./routes/checkout');
//const supplyRouted = require('./routes/')
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
var cors = require('cors');
const app = express();

var flash = require('connect-flash');
var logger = require('morgan');
var bodyParser = require('body-parser');



require('./config/passport')(passport);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieSession({
  maxAge:30 * 24 * 60 * 60 *1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Access-Control-Allow-Credentials",true);
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// set up routes
app.use('/',indexRoutes);
app.use('/category', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/customer', userRoutes);
app.use('/manager', managerRoutes);
app.use('/products', productRoutes);
app.use('/checkout',checkRoutes);
app.use('/order',orderRoutes);



app.listen(8080, () => {
  console.log('app now listening for requests on port 8080');
});
module.exports = app;
