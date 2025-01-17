import {
  templateForgotPassword,
  templateVerifyEmail,
} from '../constants/email-templates'

export const customer = {
  order: {
    confirmEmailMail: {
      subject: 'Order Confirmation Email',
      html: templateVerifyEmail,
      generateUrl(token: string) {
        return `${process.env.UI_URL}/auth/setup-password/${token}`
      },
    },
  },
}
