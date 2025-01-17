import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})

import { authConfig } from '../../config/auth'

import bcrypt from 'bcryptjs'
import { generateToken, getCurrentDate } from '../../utils'
import { BadRequestError } from '../../errors'
import { Admin } from '../../models'

type LoginUserByEmail = Pick<Admin, 'email' | 'password'>
export async function loginByEmail({ email, password }: LoginUserByEmail) {
  const admin = await Admin.query()
    .where({
      email,
    })
    .first()

  if (!admin) {
    throw new BadRequestError('USER_DOESNT_EXIST')
  }

  if (!bcrypt.compareSync(password, admin.password)) {
    throw new BadRequestError('INVALID_CREDENTIALS')
  }

  // Todo: add lastLoginDate col in admin table
  await Admin.query()
    .patch({
      lastLoginDate: getCurrentDate(),
    })
    .where({ id: admin.id })

  authConfig.admin.login.payload = { adminId: admin.id, email }
  const token = generateToken(authConfig.admin.login)

  return token
}
