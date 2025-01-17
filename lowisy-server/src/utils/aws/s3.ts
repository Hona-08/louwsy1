import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import { s3Config } from '../../config/s3'
const s3 = new S3(s3Config)

export function uploadFile(file: any) {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: s3Config.bucketName,
    Body: fileStream,
    Key: file.filename,
  }
  return s3.upload(uploadParams).promise()
}

export function s3DeleteObject(params: S3.DeleteObjectRequest) {
  s3.deleteObject(params)
    .promise()
    .then(() => {
      //TODO: handle success properly
      console.log('success')
    })
    .catch((err) => {
      //TODO: handle error properly
      console.error(err)
    })
}
