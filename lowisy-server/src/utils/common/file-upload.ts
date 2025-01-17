import { S3 } from 'aws-sdk'
import { Request } from 'express'
import mime from 'mime'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3Config } from '../../config/s3'

const s3 = new S3(s3Config)

export const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: s3Config.bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})
