var express = require('express');
var router = express.Router();

/* GET navigation page. */
router.get('/', function(req, res, next) {
  res.render('navigation', { title: 'Navigation' });
});

module.exports = router;
