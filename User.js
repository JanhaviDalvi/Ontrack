const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'ontrackdb',
	password: 'postgres',
	port: 5432,
});
var c = 'cc';
class User {
	constructor(email, password, id=null) {
		this.email = email;
		this.password = password;
		this.id = id;
	}

	async save() {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		console.log(hashedPassword);
		console.log(hashedPassword.length);
		const client = await pool.connect();
		try {
			const result = await client.query(
				'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
				[this.email, hashedPassword]
			);
			this.id = result.rows[0].id;
			console.log('jkdshj');
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

	static async findByEmail(email) {
		const client = await pool.connect();
		try {
			const result = await client.query('SELECT * FROM users WHERE email=$1', [email]);
			if(result.rows[0]){
				const user = new User(result.rows[0].email, result.rows[0].password, result.rows[0].id);
				return user;
			}
			else{
				console.log("no email found!");
			}
		} finally {
			client.release();
		}
	}

	async comparePassword(password) {
		return await bcrypt.compare(password, this.password);
	}

	// to save a task in db
	static async save_task(task_name, description, due_date, date_creation, tag, priority, userId){
		const client = await pool.connect();
		try {
			const result = await client.query(
				'INSERT INTO task (task_name, description, due_date, date_creation, status, tag, priority, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING task_id',
				[task_name, description, due_date, date_creation, 'todo', tag, priority, userId]
			);
			return result.rows[0];
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

	// to get tasks of todo, inprogress and completed of user
	static async read_tasks(userId){
		const client = await pool.connect();
		try {
			const result = await client.query(
				'SELECT * FROM task WHERE user_id=$1', [userId]
			);
			return result.rows;
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

	static async update_status(status, task_id){
		const client = await pool.connect();
		try {
			const result = await client.query(
				'UPDATE task SET status = $1 WHERE task_id = $2', [status, task_id]
			);
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

	// to save a task in db
	static async save_habit(habit_name, habit_tag, currentDate, userId){
		const client = await pool.connect();
		try {
			const result = await client.query(
				'INSERT INTO habit (habit_name, habit_tag, creation_date, user_id) VALUES ($1, $2, $3, $4) RETURNING habit_id',
				[habit_name, habit_tag, currentDate, userId]
			);
			return result.rows[0];
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

	// to get tasks of todo, inprogress and completed of user
	static async read_habits(userId){
		const client = await pool.connect();
		try {
			const result = await client.query(
				'SELECT * FROM habit WHERE user_id=$1', [userId]
			);
			return result.rows;
		} 
		catch(e){
			console.log(e.message)
		}
		finally {
			client.release();
		}
	}

}

module.exports = User;