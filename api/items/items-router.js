const express = require('express')
const db = require('../data/db-config')
const router = express.Router()
const {
  find,
  findById,
  findByOwner,
  add,
  update,
  remove,
  findByCat
} = require('./items-model')

router.get('/', async (req, res, next) => {
  try {
const items = await find()
res.status(200).json(items)
  } catch(err) {
    next(err)
  }
})

router.get('/categories/:id', async (req, res, next) => {
  try {
const cat = await req.params.id 
const items = await findByCat(cat)
res.status(200).json(items)
  } catch(err) {
    next(err)
  }
})

router.get('/owner/:user_id', async (req, res, next) => {
  try {
    const owner = await req.params.user_id
    console.log(owner)
const ownerItems = await findByOwner(owner)
res.status(200).json(ownerItems)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
const newItem = await {
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  location: req.body.location,
  cat_id: req.body.cat_id
}



const added = await add(newItem)

console.log('added: ', added)
console.log('added.item_id ', added.item_id)

const newUItem = await {
  item_id: added.item_id,
  user_id: req.body.user_id
}
console.log('newUItem: ', newUItem)
const junctionItem = await db('users_items').insert(newUItem)

res.status(201).json(added)
  } catch(err) {
    next(err)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
console.log('req.params: ', req.params)
    console.log('req.body: ', req.body)
const updatedItem = await update(req.params.itemId, req.body)

console.log('updatedItem: ', updatedItem)

res.status(201).json(updatedItem)

  } catch(err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
await remove(req.params.itemId)
res.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = router