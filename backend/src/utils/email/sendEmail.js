const { Resend } = require('resend')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const sendEmail = async (email, subject, payload, template) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const source = fs.readFileSync(path.join(__dirname, template), 'utf8')
    const compiledTemplate = handlebars.compile(source)

    resend.emails.send({
      from: 'noreply@alastisolutions.org',
      to: email,
      subject,
      html: compiledTemplate(payload)
    })
  } catch (err) {
    return err
  }
}

module.exports = {
  sendEmail
}
