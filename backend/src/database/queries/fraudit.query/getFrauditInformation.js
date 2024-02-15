import Fraudit from '../../../models/fraudit.model'

export const getFrauditInformation = async (id) => {
  const fraudit = await Fraudit.findById(id)

  if (!fraudit) {
    // TODO: ERRO HANDLER
    throw new Error('Fraudit Does not exist')
  }

  const { ...info } = fraudit._doc

  return {
    ...info
  }
}
