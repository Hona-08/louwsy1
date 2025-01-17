import S3 from 'aws-sdk/clients/s3'
import { User as AuthUser } from '../models/user/user.model'
import { Customer as CustomerAuth } from '../models/customer/customer.model'
import { Admin as AdminAuth } from '../models/admin/admin.model'

type GoogleUser = {
  Id: string
  email: string
  displayName: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      DB_HOST: string
      DB_PORT: number
      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
      PORT: number
      AWS_BUCKET_NAME: string
      AWS_BUCKET_REGION: string
      AWS_ARN: string
      AWS_S3_ACCESS_KEY: string
      AWS_S3_SECRET_KEY: string
      AWS_SES_SECRET_KEY: string
      AWS_SES_ACCESS_KEY: string
    }
  }

  namespace Express {
    interface Request {
      lang: 'en' | 'de'
      authUser: AuthUser
      s3Params: S3.DeleteObjectRequest
      googleUser: GoogleUser
      customerInfo: CustomerAuth
      adminInfo: AdminAuth
    }
  }
}

export {}
