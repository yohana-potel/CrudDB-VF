var express = require('express');
var router = express.Router();
const ctl = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/personas', ctl.listPersonas);


// Aca van las otras cosas

module.exports = router;
