var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Room = require('../models/Room.js')

/* Get All Room */
router.get('/', function (req, res, next) {
  Room.find(function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})

/* Get Room by ID */
router.get('/:id', function (req, res, next) {
  Room.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Save Room */
router.post('/', function (req, res, next) {
  Room.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Update Room */
router.put('/:id', function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Delete Room */
router.delete('/:id', function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
