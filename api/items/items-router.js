const express = require('express')
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

// router.post('/', async (req, res, next) => {
//   try {

//   } catch(err) {
//     next(err)
//   }
// })

// router.put('/', async (req, res, next) => {
//   try {

//   } catch(err) {
//     next(err)
//   }
// })

// router.delete('/', async (req, res, next) => {
//   try {

//   } catch(err) {
//     next(err)
//   }
// })

module.exports = router