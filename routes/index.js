var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  gebirgeId = req.query.id || false; //kurz für "entweder req.params.gebirgeId, oder false wenn es undefined ist."
  res.render('index', { title: 'Home', gebirgeID: gebirgeId });
});

module.exports = router;
