const router = require('express').Router()

const db = require('./users-model')


router.get("/", (req,res) => {
    db.find()
    .then(users => {
        res.status(200).json({data: users})
    }).catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports = router;