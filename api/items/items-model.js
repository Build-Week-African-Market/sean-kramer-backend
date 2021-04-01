const db = require('../data/db-config')


function find() {
  return db('items')
}

async function add(item) {
  const itemId = await db('items').insert(item).returning('item_id')

  console.log('itemId: ', itemId[0])

  return findById(itemId[0])
  
}

// const userId = await db("users").insert(user)
// .returning('id')

// return findById(parseInt(userId))

function findById(id) {
  return db('items').where('item_id', id).first()
}

function findByCat(cat) {
  return db('items as i')
  .join('categories as c', 'i.cat_id', 'c.cat_id')
  .where('i.cat_id', cat)
  .select('*')
}

function findByOwner(owner) {
  return db.select('i.name', 'i.description', 'i.price', 'i.location')
  .from('items as i')
  .join('users_items as ui', 'ui.item_id', 'i.item_id')
  .join('users as u', 'u.id', 'ui.user_id')
  .where('ui.user_id', '=', owner)
}



async function update(id, changes) {
  await db('items').where('item_id', id).update(changes)
  return findById(id)
}

function remove(id) {
  return db('items').where('item_id', id).del()
}


module.exports = {
  find,
  findById,
  findByCat,
  findByOwner,
  add,
  update,
  remove
}