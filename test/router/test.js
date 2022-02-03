const express = require('express')
const router = express.Router()

router.use('/hi', function(req, res) {
  return res.send('<p>OH, HELLO</p>')
})

router.use('/', function(req, res) {
  return res.send('<p>Herrlo</p>')
})

module.exports = router