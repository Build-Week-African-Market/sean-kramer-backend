exports.up = async (knex) => {
	// await knex.schema.createTable("roles", (table) => {
	// 	table.increments("id")
	// 	table.text("name").notNull().unique()
	// })

	await knex.schema.createTable("users", (table) => {
		table.increments("id")
		table.text("username").notNull().unique()
		table.text("password").notNull()
    table.boolean("owner").defaultTo(true)
		// table.integer("role_id")
		// 	// .defaultTo('owner')
		// 	.references("id")
		// 	.inTable("roles")
		// 	.onDelete("RESTRICT")
		// 	.onUpdate("CASCADE")
	})

    await knex.schema.createTable('categories', (table) => {
      table.increments('cat_id')
      table.text('category').notNull().unique()
    })

    await knex.schema.createTable('items', (table) => {
      table.increments('item_id')
      table.text('name').notNull().unique()
      table.text("description")
      table.decimal('price').notNull()
      table.text('location')
      table.integer('cat_id')
      .references('cat_id')
      .inTable('categories')
    })

    await knex.schema.createTable('users_items', (table) => {
      table.integer('item_id').references('item_id').inTable('items').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.primary(['item_id', 'user_id'])
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users_items')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('users')
  // await knex.schema.dropTableIfExists("roles")
  
  
}
