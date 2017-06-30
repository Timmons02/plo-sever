var express = require('express')
var app = express()
app.get('/categories/:hand/:suitedness', function (req, res) {
  res.send(req.params)
})