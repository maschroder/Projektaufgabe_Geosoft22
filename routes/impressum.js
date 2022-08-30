var express = require('express');
var router = express.Router();

/* GET impressum page. */
router.get('/', async function(req, res, next) {
  res.render('impressum', { title: 'Impressum'});
});

module.exports = router;