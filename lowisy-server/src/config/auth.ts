import {
  templateForgotPassword,
  templateRecommendRestaurant,
  templateVerifyEmail,
} from '../constants/email-templates'

export const authConfig = {
  admin: {
    confirmEmail: {
      secretKey: 'confirm-email-key',
      signOptions: { expiresIn: '3 days' },
      payload: { userId: '' },
    },
    confirmEmailMail: {
      subject: 'Confirmation Email',
      html: templateVerifyEmail,
      generateUrl(token: string) {
        return `${process.env.UI_URL}/api/users/auth/confirm-email/${token}`
      },
    },
    forgetPassword: {
      secretKey: 'forget-password-key',
      signOptions: { expiresIn: '3 days' },
      payload: {
        adminId: '',
        email: '',
      },
    },
    forgetPasswordMail: {
      subject: 'Password Reset',
      html: templateForgotPassword,
      generateUrl(token: string) {
        return `${process.env.UI_URL}/reset-password/${token}`
      },
    },
    login: {
      secretKey: 'login-secret-key',
      signOptions: { expiresIn: '15 days' },
      payload: {
        adminId: '',
        email: '',
      },
    },
    cookieOptions: {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: false,
    },
  },
  shop: {
    confirmEmail: {
      secretKey: 'confirm-email-key',
      signOptions: { expiresIn: '3 days' },
      payload: {
        name: '',
        slug: '',
        countryId: '',
        email: '',
        lat: '',
        lng: '',
      },
    },
    confirmEmailMail: {
      subject: 'Confirmation Email',
      html: templateVerifyEmail,
      generateUrl(token: string) {
        return `${process.env.UI_URL}/auth/setup-password/${token}`
      },
    },
    recommendRestaurantEmail: {
      subject: 'Restaurant Recommendation',
      html: templateRecommendRestaurant,
    },
    contactUs: {
      subject: 'Support Request',
      html: templateRecommendRestaurant,
    },
    forgetPassword: {
      secretKey: 'forget-password-key',
      signOptions: { expiresIn: '3 days' },
      payload: {
        shopId: '',
        email: '',
      },
    },
    forgetPasswordMail: {
      subject: 'Password Reset',
      html: templateForgotPassword,
      generateUrl(token: string) {
        return `${process.env.UI_URL}/auth/reset-password/${token}`
      },
    },
    login: {
      secretKey: 'login-secret-key',
      signOptions: { expiresIn: '15 days' },
      payload: {
        shopId: '',
        email: '',
      },
    },
    cookieOptions: {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: false,
    },
  },
  customer: {
    confirmEmail: {
      secretKey: 'confirm-email-key',
      signOptions: { expiresIn: '3 days' },
      payload: { phone: '', email: '' },
    },
    confirmEmailMail: {
      subject: 'Confirmation Email',
      html: templateVerifyEmail,
      generateUrl(token: string) {
        return `${process.env.SERVER_URL}/api/customers/auth/confirm-email/${token}`
      },
    },
    forgetPassword: {
      secretKey: 'forget-password-key',
      signOptions: { expiresIn: '3 days' },
      payload: {
        customerId: '',
        email: '',
      },
    },
    forgetPasswordMail: {
      subject: 'Password Reset',
      html: templateForgotPassword,
      generateUrl(token: string) {
        return `${process.env.WEB_SHOP_URL}/reset-password/${token}`
      },
    },
    login: {
      secretKey: 'login-secret-key',
      signOptions: { expiresIn: '15 days' },
      payload: {
        customerId: '',
        email: '',
        name: '',
      },
    },
    cookieOptions: {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: false,
    },
  },
}
