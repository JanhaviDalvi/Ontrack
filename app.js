const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const authRoutes = require('./routes/auth');
const avatarRoutes = require('./routes/avatarRoutes');
var cookieParser = require("cookie-parser")
var flash = require('connect-flash');

var User = require("./User");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));//during form handlling(post/get)
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.set("view engine", "ejs");
app.use('/', authRoutes);
app.use('/', avatarRoutes);
app.use(cookieParser("your-secret-key"));
app.use(flash());

let sessionObj;
app.use(function (req, res, next) {
	res.locals.sessionObj = req.session;
	next();
});

app.get("/", async (req, res) => {
	if (req.session.userId) {
		var user_tasks;
		if(req.session.sort == 'none'){
			user_tasks = await User.read_tasks(req.session.userId);
			console.log(user_tasks);
		}
		else{
			user_tasks = await User.sort_priority(req.session.userId);
			console.log("usertasks:", user_tasks);
		}
		res.render('kanban', {tasks: user_tasks, userId: req.session.userId, username: req.session.username, avatar_id: req.session.avatar_id, avatar_character: req.session.avatar});
	}
	else {
		res.render('login');
	}
});

app.get("/task", (req, res) => {
	if (req.session.userId) {
		res.render('task', {userId: req.session.userId});
	}
	else {
		res.render('login');
	}
});

app.post("/task", async (req, res) => {
	console.log(req.body);
	const currentDate = new Date().toDateString();
	User.save_task(req.body.cardName, req.body.cardDescription, req.body.cardDueDate, currentDate, req.body.cardTag, req.body.cardPriority, req.session.userId)
	// var user_tasks = await User.read_tasks(req.session.userId);
	// console.log(user_tasks);
	// res.render('kanban', {tasks: user_tasks, userId: req.session.userId, username: req.session.username, avatar_id: req.session.avatar_id, avatar_character: req.session.avatar});
	console.log("should be redirect");
	res.redirect("/");
});

// this will handle column change of card by dragging, will update status of card in db.
app.post('/drag', async function(req, res) {
	var column = req.body.column;
	var task_id = req.body.task_id;
	console.log('ajax data:', column, task_id);
	await User.update_status(column, task_id);
});

app.get('/habits', async (req, res) => {
	if (req.session.userId) {
		var user_habits = await User.read_habits(req.session.userId);
		console.log(user_habits);
		res.render('habits', {habits: user_habits, userId: req.session.userId, username: req.session.username, avatar_id: req.session.avatar_id, avatar_character: req.session.avatar});
	}
	else {
		res.render('login');
	}
});

// when sort by option is changed in kanban board
app.post('/sortby', async function(req, res) {
	var sort = req.body.sort;
	console.log('ajax sort:', sort);
	req.session.sort = sort;
	res.redirect('/');
	// res.render('kanban', {tasks: user_tasks, userId: req.session.userId, username: req.session.username, avatar_id: req.session.avatar_id, avatar_character: req.session.avatar});
	// res.redirect(`/?tasks=${user_tasks}&userId=${req.session.userId}&username=${req.session.username}&avatar_id=${req.session.avatar_id}&avatar_character=${req.session.avatar}`);
});


app.get("/addhabit", (req, res) => {
	if (req.session.userId) {
		res.render('addhabit', {userId: req.session.userId});
	}
	else {
		res.render('login');
	}
});

app.post("/addhabit", async (req, res) => {
	console.log(req.body);
	const currentDate = new Date().toDateString();
	let result = await User.save_habit(req.body.habitName, req.body.habitTag, currentDate,  req.session.userId)
	// var user_tasks = await User.read_tasks(req.session.userId);
	// console.log(user_tasks);
	// res.render('kanban', {tasks: user_tasks, userId: req.session.userId, username: req.session.username, avatar_id: req.session.avatar_id, avatar_character: req.session.avatar});
	console.log("habit saved");
	res.redirect("/habits");
});


app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

module.exports = sessionObj;
