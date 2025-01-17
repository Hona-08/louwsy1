import AWS from 'aws-sdk'
import { sesConfig } from '../../config/ses'
const AWS_SES = new AWS.SES(sesConfig)

type SendEmail = {
  emails: string[]
  subject: string
  html: string
}

export async function sendEmail({ emails, subject, html }: SendEmail) {
  const params = {
    Destination: {
      ToAddresses: emails,
    },
    Message: {
      Body: {
        Html: { Data: html },
      },
      Subject: { Data: subject },
    },
    Source: 'no-reply@lowisy.com',
  }
  return AWS_SES.sendEmail(params).promise()
}
