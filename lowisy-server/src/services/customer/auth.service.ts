import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})
import jwt, { JwtPayload } from 'jsonwebtoken'
import { authConfig } from '../../config/auth'

import bcrypt from 'bcryptjs'
import {
  generateToken,
  getCurrentDate,
  sendEmail,
  verifyToken,
} from '../../utils'
import { BadRequestError } from '../../errors'
import { Customer } from '../../models/customer'
import { UserPayload } from '../../types'
import { CustomerStatus } from '../../enums/customer-status'
import { ReqLang } from '../../enums/lang'

type Registercustomer = {
  name: string
  email: string
  phone: string
  password: string
}

export async function register(
  { name, email, phone, password }: Registercustomer,
  lang: ReqLang,
) {
  // if the user has already registered before
  const user = await Customer.query().where({ email }).first()

  if (user) throw new BadRequestError('USER_ALREADY_EXIST')

  authConfig.customer.confirmEmail.payload = { phone, email }

  // change this later from any to specific type
  const token = generateToken(authConfig.customer.confirmEmail as any)

  const { subject, html, generateUrl } = authConfig.customer.confirmEmailMail

  await sendEmail({
    emails: [email],
    subject,
    html: html[lang].replace('$URL$', generateUrl(token)),
  })

  await Customer.query().insert({
    name,
    email,
    phone,
    password: bcrypt.hashSync(password, 10),
  })
}

export async function confirmEmail(token: string) {
  const { secretKey } = authConfig.customer.confirmEmail
  const { email } = jwt.verify(token, secretKey) as UserPayload

  await Customer.query()
    .patch({ status: CustomerStatus.EMAIL_VERIFIED })
    .where({ email })
}

type LoginUserByEmail = Pick<Customer, 'email' | 'password'>
export async function loginByEmail({ email, password }: LoginUserByEmail) {
  const customer = await Customer.query()
    .where({
      email,
    })
    .first()

  if (!customer) throw new BadRequestError('USER_DOESNT_EXIST')

  if (!bcrypt.compareSync(password, customer.password))
    throw new BadRequestError('INVALID_CREDENTIALS')

  if (customer.status !== CustomerStatus.EMAIL_VERIFIED)
    throw new BadRequestError('VERIFY_EMAIL')

  authConfig.customer.login.payload = {
    customerId: customer.id,
    email: customer.email,
    name: customer.name,
  }
  // change this type from any to specific type
  const token = generateToken(authConfig.customer.login as any)

  return token
}

export async function forgetPassword(email: string, lang: ReqLang) {
  const customer = await Customer.query().where({ email }).first()
  if (!customer) return

  authConfig.customer.forgetPassword.payload = {
    customerId: customer.id,
    email,
  }
  const token = generateToken(authConfig.customer.forgetPassword as any)

  const { subject, html, generateUrl } = authConfig.customer.forgetPasswordMail
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
  const { secretKey } = authConfig.customer.forgetPassword
  // change any to specific type later
  const { customerId, email } = verifyToken({
    token: resetToken,
    secretKey,
  }) as any

  //update customer password
  await Customer.query()
    .patch({ password: bcrypt.hashSync(password, 10) })
    .where({ id: customerId })

  const { signOptions } = authConfig.customer.login
  const token = jwt.sign({ customerId, email }, secretKey, signOptions)

  return token
}

type GoogleRegister = {
  socialMediaUid: number
  email: string
  name: string
}

export async function registerGoogle({
  socialMediaUid,
  email,
  name,
}: GoogleRegister) {
  const user = await Customer.query().where({ email }).first()

  if (!user) {
    await Customer.query().insert({
      // socialMediaUid,
      email,
      name,
      status: CustomerStatus.EMAIL_VERIFIED,
    })
  }
}
