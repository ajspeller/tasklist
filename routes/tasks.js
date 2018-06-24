var express = require('express');

var router = express.Router();

router.get('/tasks', function(req, res, next) {
  res.send('tasks api');
});

module.exports = router;