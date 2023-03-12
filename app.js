const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const authRoutes = require('./routes/auth');
const avatarRoutes = require('./routes/avatarRoutes');
var cookieParser = require("cookie-parser")
var flash = require('connect-flash');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/', authRoutes);
app.use('/', avatarRoutes);
app.use(cookieParser("your-secret-key"));
app.use(flash());

let sessionObj;
app.use(function(req, res, next){
  res.locals.sessionObj = req.session;
  next();
});

app.get("/", (req, res) => {
if(req.session.userId){
  res.render('kanban');
}
else{
  res.render('login');
}
});
app.get('/habits', (req, res) => {
  res.render('habits');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


module.exports = sessionObj;
