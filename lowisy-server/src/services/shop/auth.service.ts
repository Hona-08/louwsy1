import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})
import jwt, { JwtPayload } from 'jsonwebtoken'
import { authConfig } from '../../config/auth'
import { Shop } from '../../models'
import bcrypt from 'bcryptjs'
import Slug from 'slug'
import {
  addDays,
  generateToken,
  getCurrentDate,
  sendEmail,
  verifyToken,
} from '../../utils'
import { BadRequestError } from '../../errors'
import { Discount } from '../../models/discount.model'
import {
  templateTrialLicenseExpired,
  templateUserInfoVoucher,
  templateWelcomeToLowisy,
} from '../../constants/email-templates'
import { ReqLang } from '../../enums/lang'
import { lang } from '../../lang'

type RegisterShop = {
  name: string
  countryId: string
  email: string
  lat: string
  lng: string
  slug: string
}

export async function initialRegister(
  { name, countryId, email, lat, lng }: RegisterShop,
  lang: ReqLang,
) {
  // if the user has already registered before
  const user = await Shop.query().where({ email }).first()

  if (user) throw new BadRequestError('SHOP_ALREADY_EXIST')

  let slug = Slug(name)

  const userSlug = await Shop.query().where({ slug }).first()

  if (userSlug) {
    const checkNumber = userSlug.slug.split('-').at(-1)
    const index = isNaN(+checkNumber) ? 1 : checkNumber + 1

    slug = Slug(`${name}-${index}`)
  }

  authConfig.shop.confirmEmail.payload = {
    name,
    slug,
    countryId,
    email,
    lat,
    lng,
  }

  // change this later from any to specific type
  const token = generateToken(authConfig.shop.confirmEmail as any)

  const { subject, html, generateUrl } = authConfig.shop.confirmEmailMail
  await sendEmail({
    emails: [email],
    subject,
    html: html[lang].replace('$URL$', generateUrl(token)),
  })
}

type ConfirmAndRegister = { token: string; password: string }
type JwtRegisterShop = JwtPayload & RegisterShop
export async function confirmEmailAndRegisterShop(
  { token, password }: ConfirmAndRegister,
  lang: ReqLang,
) {
  const { secretKey } = authConfig.shop.confirmEmail

  //add countryId to shop table as well
  const { exp, iat, countryId, ...shopData } = jwt.verify(
    token,
    secretKey,
  ) as JwtRegisterShop

  const shopExist = await Shop.query().where({ email: shopData.email }).first()
  if (shopExist) throw new BadRequestError('SHOP_ALREADY_EXIST')

  const shop = await Shop.query().insertAndFetch({
    ...shopData,
    password: bcrypt.hashSync(password, 10),
    expirationDate: addDays(10),
  })

  await sendEmail({
    emails: [shopData.email],
    subject: `Welcome to Lowisy`,
    html: templateWelcomeToLowisy[lang]
      .replace('$restaurantName$', shop.name)
      .replace('$restaurantName$', shop.name),
  })

  const isRecommended = await Discount.query().findOne({
    restaurantEmail: shopData.email,
    usedBy: 'customer',
  })
  if (isRecommended) {
    await sendEmail({
      emails: [isRecommended.customerEmail],
      subject: `Hello, your €10 voucher for recommending ${shop.name} has arrived!`,
      html: templateUserInfoVoucher[lang]
        .replace('$restaurantName$', shop.name)
        .replace('$restaurantName$', shop.name)
        .replace(
          '$URL$',
          `https://uat-restaurant.lowisy.com/restaurants/${shop.slug}`,
        )
        .replace(
          '$URL$',
          `https://uat-restaurant.lowisy.com/restaurants/${shop.slug}`,
        )
        .replace('$discountCode', isRecommended.code),
    })
  }
}

type LoginUserByEmail = Pick<Shop, 'email' | 'password'>
export async function loginByEmail(
  { email, password }: LoginUserByEmail,
  lang: ReqLang,
) {
  const shop = await Shop.query()
    .where({
      email,
    })
    .first()

  if (!shop) throw new BadRequestError('USER_DOESNT_EXIST')

  if (!bcrypt.compareSync(password, shop.password))
    throw new BadRequestError('INVALID_CREDENTIALS')

  await Shop.query()
    .patch({
      lastLoginDate: getCurrentDate(),
    })
    .where({ id: shop.id })

  if (shop.expirationDate < new Date().toDateString()) {
    await sendEmail({
      emails: [shop.email],
      subject: 'Trail License expired',
      html: templateTrialLicenseExpired[lang].replace(
        '$restaurantName',
        shop.name,
      ),
    })
  }
  authConfig.shop.login.payload = { shopId: shop.id, email: shop.email }
  // change this type from any to specific type
  const token = generateToken(authConfig.shop.login as any)

  return token
}

export async function forgetPassword(email: string, lang: ReqLang) {
  const shop = await Shop.query().where({ email }).first()
  if (!shop) return

  authConfig.shop.forgetPassword.payload = { shopId: shop.id, email }
  const token = generateToken(authConfig.shop.forgetPassword as any)

  const { subject, html, generateUrl } = authConfig.shop.forgetPasswordMail
  await sendEmail({
    emails: [email],
    subject,
    html: html[lang].replace('$URL$', generateUrl(token)),
  })
}

type ResetPassword = {
  resetToken: string
  password: string
}
export async function resetPassword({ resetToken, password }: ResetPassword) {
  const { secretKey } = authConfig.shop.forgetPassword
  // change any to specific type later
  const { shopId, email } = verifyToken({ token: resetToken, secretKey }) as any

  await Shop.query()
    .patch({ password: bcrypt.hashSync(password, 10) })
    .where({ id: shopId })

  const { signOptions } = authConfig.shop.login
  const token = jwt.sign({ shopId, email }, secretKey, signOptions)

  return token
}
