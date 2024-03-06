const { Resend } = require('resend')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const sendEmail = async (email, subject, payload, template) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const source = fs.readFileSync(path.join(__dirname, template), 'utf8')
  const compiledTemplate = handlebars.compile(source)

  const { data, error } = await resend.emails.send({
    from: 'Fraudit Team <noreply@alastisolutions.org>',
    to: email,
    subject,
    html: compiledTemplate(payload),
    tags: [
      {
        name: 'category',
        value: 'reset_password'
      }
    ]
  })

  return { data, error }
}

module.exports = {
  sendEmail
}
