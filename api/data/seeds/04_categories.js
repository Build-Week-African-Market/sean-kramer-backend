exports.seed = async function(knex) {
	await knex("categories").insert([
		{ cat_id: 1, category: "food" },
		{ cat_id: 2, category: "clothing" },
    { cat_id: 3, category: "electronics" },
	])
}