const db = require('../data/db-config')


function find() {
  return db('items')
}

async function add(item) {
  const [id] = await db('items').insert(item)
  return findById(id)
}

function findById(id) {
  return db('items').where({id}).first()
}

function findByCat(cat) {
  return db('items as i')
  .join('categories as c', 'i.cat_id', 'c.cat_id')
  .where('i.cat_id', cat)
  .select('*')
}

async function update(id, changes) {
  await db('items').where({id}).update(changes)
  return findById(id)
}

function remove(id) {
  return db('items').where({id}).del()
}


module.exports = {
  find,
  findById,
  findByCat,
  add,
  update,
  remove
}