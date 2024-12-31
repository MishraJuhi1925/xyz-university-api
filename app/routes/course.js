const router = require('express').Router();
const CourseController = require('../controllers/course');

router.post('/course', (req, res, next) => {
    CourseController.addCourse(req.context, req.body)
        .then(data => res.json({ success: true, data }))
        .catch(next);
});

router.get('/courses', (req, res, next) => {
    CourseController.getAllCourses(req.context)
        .then(data => res.json({ success: true, data }))
        .catch(next);
});

router.get('/courses/:id', (req, res, next) => {
    CourseController.getCourseById(req.context, req.params.id)
        .then(data => res.json({ success: true, data }))
        .catch(next);
});

router.get('/courses/program/:programId', (req, res, next) => {
    CourseController.getCoursesByProgram(req.context, req.params.programId)
        .then(data => res.json({ success: true, data }))
        .catch(next);
});

module.exports = router;
