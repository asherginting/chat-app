var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var Chat = require('../models/Chat.js')

// Socket IO
server.listen(4000)

io.on('connection', function (socket) {
  console.log('User connected')
  socket.on('disconnect', function () {
    console.log('User disconnected')
  })
  socket.on('save-message', function (data) {
    console.log(data)
    io.emit('new-message', { message: data })
  })
})

/* Get All Chat */
router.get('/:roomid', function (req, res, next) {
  Chat.find({ room: req.params.roomid }, function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})

/* Get Chat by ID */
router.get('/:id', function (req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Save Chat */
router.post('/', function (req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Update Chat */
router.put('/:id', function (req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* Delete Chat */
router.delete('/:id', function (req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
