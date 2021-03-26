exports.seed = async function(knex) {
	await knex("roles").insert([
		{ id: 1, name: "user" },
		{ id: 2, name: "owner" },
	])
}