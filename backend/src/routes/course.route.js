const express = require("express");
const {
  deleteCourse,
  getCourse,
  updateCourse,
  getCourses,
} = require("../controller/course.controller");

const router = express.Router();

router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get("/getcourses", getCourses);
router.get("/:courseId", getCourse);

module.exports = router;
