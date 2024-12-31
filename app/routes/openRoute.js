const router = require('express').Router();
const AuthController = require('../controllers/auth');
const Authorize = require('../middlewares/authorize');
const db = require('../config/config');
const CollegeController = require('../controllers/college');

router.post('/admins/register', (req, res, next) => {
    AuthController.register(req.context, req.body)
        .then(data => res.json({success: true, data}))
        .catch(next)
})

router.post('/admins/login', (req, res, next) => {
    AuthController.login(req.context, req.body)
        .then(data => res.json({success: true, data}))
        .catch(next)
})


router.post('/college/register', (req, res, next) => {
    CollegeController.register(req.context, req.body)
        .then(data => res.json({success: true, data}))
        .catch(next)
})

router.post('/college/login', (req, res, next) => {
    CollegeController.login(req.context, req.body)
        .then(data => res.json({success: true, data}))
        .catch(next)
})


module.exports = router; 