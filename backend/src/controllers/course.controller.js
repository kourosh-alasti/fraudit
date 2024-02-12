const Course = require("../models/course.model");

const getCourses = async (req, res, next) => {
  if (!res.user.isAdmin) {
    //TODO: Error Handling
    return next();
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.slot === "asc" ? 1 : -1;

    const courses = await Course.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalCourses = Course.countDocuments();

    res.status(200).json({
      courses,
      totalCourses,
    });
  } catch (err) {
    next(err);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.userId);

    if (!course) {
      //TODO: Error Handling
      return next();
    }

    const { ...info } = course._doc;

    res.status(200).json(info);
  } catch (err) {
    // TODO: Error Handling
    next(err);
  }
};
const deleteCourse = async (req, res, next) => {};
const updateCourse = async (req, res, next) => {};

module.exports.getCourses = getCourses;
module.exports.getCourse = getCourse;
module.exports.deleteCourse = deleteCourse;
module.exports.updateCourse = updateCourse;
