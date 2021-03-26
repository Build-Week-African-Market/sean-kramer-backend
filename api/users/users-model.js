const db = require('../data/db-config')

async function add(user) {
	const userId = await db("users").insert(user)
  .returning('id')

	return findById(parseInt(userId))
}

function find() {
	return db("users as u")
		.join("roles as r", "r.id", "u.role_id")
		.select("u.id", "u.username")
}

function findById(id) {
	return db("users as u")
		.join("roles as r", "r.id", "u.role_id")
		.where("u.id", id)
		.first("u.id", "u.username", "r.name as role")
}

function findByUsername(username) {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "r.name as role")
}

module.exports = {
	add,
	find,
	findById,
	findByUsername,
}