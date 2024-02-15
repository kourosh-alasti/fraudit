import Fraudit from '../models/fraudit.model'
import { getFrauditOwnerStatus } from '../database/queries/fraudit.query'

export const createFraudit = async (req, res, next) => {
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

export const deleteFraudit = async (req, res, next) => {
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
