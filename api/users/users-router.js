const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
// const { restrict } = require("./users-middleware")

const router = express.Router()

router.get("/", 
// restrict("basic"), 
async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findByUsername(username)

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username, password
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		const token = jwt.sign({
			userID: user.id,
			userRole: user.role,
		}, process.env.JWT_SECRET)

		// tell the client to set a cookie with this value
		res.cookie("token", token)
		
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
		// but it becomes useless to them once the session is deleted server-side.
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router