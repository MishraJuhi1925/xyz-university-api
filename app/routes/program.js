const router = require('express').Router();
const ProgramController = require('../controllers/program');


router.post('/program', (req, res, next) => {
    ProgramController.addDocument(req.context, req.body)
        .then(data => res.json({success: true, data}))
        .catch(next)
})

router.get('/programs', (req, res, next) => {
    ProgramController.getAllPrograms(req.context)
        .then(data => res.json({success: true, data}))
        .catch(next)
})

router.get('/programs/:id', (req, res, next) => {
    ProgramController.getProgramById(req.context, req.params.id)
        .then(data => res.json({success: true, data}))
        .catch(next)
})

module.exports = router; 