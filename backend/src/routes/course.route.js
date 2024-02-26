const express = require('express')
const {
  deleteCourse,
  getCourse,
  updateCourse,
  getCourses
} = require('../controller/course.controller')

const router = express.Router()

router.get('/', getCourses)
router.get('/:courseId', getCourse)
router.delete('/:courseId', deleteCourse)
router.patch('/:courseId', updateCourse)

module.exports = router
