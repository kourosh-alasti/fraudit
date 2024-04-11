const Fraudit = require('../models/fraudit.model')
const { getFrauditOwnerStatus } = require('../database/queries/fraudit.query')

const createFraudit = async (req, res, next) => {
  const { title, description, slug, userId } = req.body

  if (
    !title ||
    !description ||
    !slug ||
    !userId ||
    title === '' ||
    description === '' ||
    slug === '' ||
    userId === ''
  ) {
    // TODO: ERROR HANDLER
    next()
  }

  const newFraudit = new Fraudit({
    title,
    description,
    slug,
    ownerId: userId,
    memberCount: 1
  })

  try {
    await newFraudit.save()
    res.status(201).json('Created SubFraudit Successfully')
  } catch (err) {
    next(err)
  }
}

const deleteFraudit = async (req, res, next) => {
  const { frauditId, userId } = req.body

  const { isOwner } = getFrauditOwnerStatus(frauditId, userId)

  if (!isOwner) {
    // TODO: ERROR HANDLER
    next()
  }

  try {
    await Fraudit.findByIdAndDelete(frauditId)
    res.status(200).json('SubFraudit has been successfully deleted')
  } catch (err) {
    next(err)
  }
}

const getFraudit = async (req, res, next) => {
  try {
    const fraudit = await Fraudit.findById(req.params.frauditId)

    if (!fraudit) {
      res.status(404)
      res.json({ message: 'Subfraudit does not exist' })
      return next()
    }

    const { ownerId, ...rest } = fraudit._doc

    res.status(200)
    res.json(rest)
  } catch (err) {
    next(err)
  }
}

const getFraudits = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.slot === 'arc' ? 1 : -1

    const fraudits = await Fraudit.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)

    const frauditsWithoutOwnerId = fraudits.map((fraudit) => {
      const { ownerId, ...rest } = fraudit._doc

      return rest
    })

    const totalFraudits = await Fraudit.countDocuments()

    res.status(200)
    res.json({ fraudits: frauditsWithoutOwnerId, totalFraudits })
  } catch (err) {
    next(err)
  }
}

const updateFraudits = async (req, res, next) => {
  const fraudit = await Fraudit.findById(req.params.frauditId)

  if (req.user.id !== fraudit.ownerId && !req.isAdmin) {
    res.status(403)
    res.json({ message: "Access Denied. Can't update other subfraudits" })
    return next()
  }

  if (req.body.title) {
    if (req.body.title < 5) {
      return next()
    }

    if (!req.body.title.match(/^[a-zA-Z0-9]+$/)) {
      return next()
    }
  }
  if (req.body.description) {
    if (req.body.description.trim() < 2) {
      return next()
    }
  }
  if (req.body.slug) {
    if (req.body.slug.length < 5) {
      return next()
    }
  }

  try {
    const updatedFraudit = await Fraudit.findByIdAndUpdate(
      req.params.frauditId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          slug: req.body.slug
        }
      },
      { new: true }
    )

    const { ownerId, ...rest } = updatedFraudit._doc
    res.status(200)
    res.json(rest)
  } catch (err) {
    next(err)
  }
}

module.exports.createFraudit = createFraudit
module.exports.deleteFraudit = deleteFraudit
module.exports.getFraudit = getFraudit
module.exports.getFraudits = getFraudits
module.exports.updateFraudits = updateFraudits
