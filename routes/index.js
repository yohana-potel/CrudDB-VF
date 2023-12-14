var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/personas', controllers.listPersonas);
router.get('/agregar', controllers.agregarPersona);
router.post("/agregar", controllers.postAgregarPersona);
router.get('/edit/:id', controllers.getEditarPersona);
router.post('/update/:id', controllers.postUpdatePersona);
router.get('/delete/:id', controllers.getDeletePersona);
router.post('/delete/:id', controllers.postDeletePersona);
router.get('/buscar', controllers.buscarPersona);
router.post('/resoficina', controllers.buscarPersonaResultados);

router.get('/oficinas', controllers.listoficina);//funciona
//router.get('/oficinas', controllers.tablaOficina);
router.get('/add', controllers.agregarOficina );//funciona
router.post('/agregar2', controllers.postAgregarOficina );//funciona
router.get('/del/:id',controllers.getDeleteOficina);//funciona
router.post('/del/:id', controllers.postDeleteOficina);//funciona


module.exports = router;