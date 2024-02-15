import express from 'express'
import {
  deleteCourse,
  getCourse,
  updateCourse,
  getCourses
} from '../controller/course.controller'

const router = express.Router()

router.put('/update/:courseId', updateCourse)
router.delete('/delete/:courseId', deleteCourse)
router.get('/getcourses', getCourses)
router.get('/:courseId', getCourse)

export default router
