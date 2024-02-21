/* eslint-disable camelcase */
const Thread = require('../models/thread.model')

// TODO

const createThread = async (req, res, next) => {}
const getThreads = async (req, res, next) => {}

const getThread = async (req, res, next) => {
  const { fraudit_id } = req.body
  const user_id = req.user.id

  try {
    const thread = await Thread.findOne({ fraudit_id, user_id }).exec()

    if (!thread) {
      // ERROR HANDLER
      return next()
    }

    const { ...rest } = thread._doc

    res.status(200).json(rest)
  } catch (err) {
    next(err)
  }
}

const deleteThread = async (req, res, next) => {
  if (!req.isAdmin) {
    // ERROR HANDLER
    return next()
  }

  try {
    await Thread.findOne().exec()
    res.status(200).json('Thread has been deleted')
  } catch (err) {
    next(err)
  }
}
const updateThread = async (req, res, next) => {}

module.exports.createThread = createThread
module.exports.getThread = getThread
module.exports.getThreads = getThreads
module.exports.deleteThread = deleteThread
module.exports.updateThread = updateThread
