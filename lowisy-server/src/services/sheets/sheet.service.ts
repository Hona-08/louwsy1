import { GoogleSpreadsheet } from 'google-spreadsheet'
import { authConfig } from '../../config'
import { templateThankYouForRecommendation } from '../../constants/email-templates'
import { BadRequestError } from '../../errors'
import { Discount } from '../../models/discount.model'
import { sendEmail } from '../../utils'
import { randomString } from '../../utils/common/random-string'
import { Shop } from '../../models'
import { ReqLang } from '../../enums/lang'
import { lang } from '../../lang'
const creds = {
  type: 'service_account',
  project_id: 'lowisy',
  private_key_id: '17f75519604d93f7fddfa46ef0aa31141d1e9fb8',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDp/ehTVT5gPg+5\nKGj4cA6o7q16Q5wh3ACyt18KrPTGPMNOQt/8Fiz3MdD6oI+KS1Gq1Nkxm+6eF6gO\n2I5XFh8amqWlXtXUhLU/9WfJ+7/TTvCD0H8/pA8JsqYSN1VHR104pn87lO1I4xFY\nrGL8n4C1MGLx0IL+jIDBEEVjsdjCd8y5Eh+2BpHRE6Voofxz+CcS97YTV+YuUuyr\ntSaCgRvAx05rH6WoVfgtV2IsnkVZlFnB2bzVhymjoNK9k6dgZaW+ZJl5jdplokOE\nmNx5g5rv0x7ESMsnmFjLGXRs7luWQr/Qqbi/xgpZLDbkutU+lNeEeXmgDbg/GZSk\nmIi5yZpPAgMBAAECggEANIz0JOcDm7zEbjqPnKAaAsGbz1Yo1gfhVkHNhAnE7VKP\nMF/fiu92CMw02Vy+7/mrbTjhUH1rMTEx6qejDBbpRGHP6txqHJDzXdphBWFXOv9D\nD+9+7I2NXQm0t2ma6uexnXvzHi/7vH9WkXohvweZcdfcmN9R1BY9Al8Dnni+LCoq\nri1YzY9DF/haKCnypYyQ93MfoSKgkcExV5bjYvY7nx8m7z0GVL559I4kI0b1+IvH\nXVo2XsA0lLCx7C2Yo39HTvyDZIi9082XCFBgSCxWsUWf2Bzmq9OsirqtsPsxC6ED\nD1W1J8PAArcDd6VXUtqG8kvqCAvZzSNFy/oblbenIQKBgQD14EtaketRW85hCEPV\nO/hVDpFV/fwPAvOkuYc/Y90OG5r5kwMgoCOHNVRzs5h9FhjsPx9/1TiVrcdK4B0p\nF9wh//DKpRoCs33JY8CEwfPsNuMYOrE8kAS25Snm4YNLHeIrLV53InA2xwYzbrox\nI/W4N0QFhCcZ2PZTwmyWDF67YQKBgQDzoFgZKPDK6WEGNGD91zY5xECu4w/sw9XZ\nE9/X1XLdPihs+p623gE5XwveQ4mDXF4GvcsEy838NSNqIAjXghnavVD0TW1/Gnwo\njnL7mjnKBNgbqEBykWD1wHwQc2i7sxG3lU4nBWQXue0QvxmpWDjEel9SWYbNjUMc\nKZAu5TFjrwKBgDtsZOnTwFqeZIeA9tvvLXppFekBhEygewABstU4LnG9bDwLMsNM\n0KlZ0zpPWnhIwec+7j736kAKitLmzUVkNdilwa1IL7wdYzYr/JhZQ7mAHmx5quIn\nMGx/gBwDvraF12Z2BZGnahVjDnWZujgsJ7PI75Chus19aTMfFx1AihihAoGARrJ/\nHj39MkTrPOuyQbdUKwtCYf3OPzzNL8NOr8lnHcDN5mIL8LEX1dg5D3S10QLa3kXx\nRiEGU2vwLPnC1xcP/aP2fA6D+eBrqzE7OLwWjQM+2zfGC/kYE/iZiASVnfJm78lJ\n9pTf6OqxWqy5+6R4RLvmMXV9YuTdVqzRBGrKHE0CgYEAgZgDhiZMX7eQceO6Y1bL\nttoN3YQgVTz22jN3qUM+GSCmnutPRf89tF7yexFyeWZcQxZEU3COHh7tsdfC1L8r\n/ROZfHLmZycMiRVxpRamY4lzF2tBTX1ZNsTGQOt8Ortoy5gA/cpUphJ1rLAYs9t+\nhj2JNtlW0JStuxtc8KVTWBw=\n-----END PRIVATE KEY-----\n',
  client_email: 'sheets@lowisy.iam.gserviceaccount.com',
  client_id: '116610862131001826426',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/sheets%40lowisy.iam.gserviceaccount.com',
}

type RecommendRestaurant = {
  name: string
  email: string
  restaurantEmail: string
  restaurantName: string
}

export async function saveRecommendedRestaurant(
  recommendedRestaurantData: RecommendRestaurant,
  lang: ReqLang,
) {
  const doc = new GoogleSpreadsheet(
    '1nBaqTsg0ciRpYCfytL1KSvWK7tnuaKSwaljyppUygPE',
  )
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const recommendationSheet = await doc.sheetsByIndex[0]
  await recommendationSheet.addRow(recommendedRestaurantData)

  const { subject, html } = authConfig.shop.recommendRestaurantEmail

  const restaurantExist = await Discount.query().findOne({
    restaurantEmail: recommendedRestaurantData.restaurantEmail,
  })

  if (restaurantExist) {
    throw new BadRequestError('SHOP_ALREADY_RECOMMENDED')
  }

  const isShopAlreadyExist = await Shop.query()
    .where({
      email: recommendedRestaurantData.restaurantEmail,
    })
    .first()

  if (isShopAlreadyExist) {
    throw new BadRequestError('SHOP_ALREADY_EXIST')
  }

  const restaurantCode = randomString()
  await Discount.query().insert({
    code: restaurantCode,
    customerEmail: recommendedRestaurantData.email,
    restaurantEmail: recommendedRestaurantData.restaurantEmail,
    discountPercentage: 10,
    usedBy: 'restaurant',
    limit: 1,
    used: 0,
  })

  const customerCode = randomString()
  await Discount.query().insert({
    code: customerCode,
    usedBy: 'customer',
    customerEmail: recommendedRestaurantData.email,
    restaurantEmail: recommendedRestaurantData.restaurantEmail,
    amount: 10,
    limit: 1,
    used: 0,
  })

  await sendEmail({
    emails: [recommendedRestaurantData.restaurantEmail],
    subject,
    html: html[lang]
      .replace('$restaurantName$', recommendedRestaurantData.restaurantName)
      .replace('$userName$', recommendedRestaurantData.name)
      .replace('$userName$', recommendedRestaurantData.name)
      .replace('$discountCode', restaurantCode),
  })

  await sendEmail({
    emails: [recommendedRestaurantData.email],
    subject,
    html: templateThankYouForRecommendation[lang]
      .replace('$restaurantName$', recommendedRestaurantData.restaurantName)
      .replace('$restaurantName$', recommendedRestaurantData.restaurantName)
      .replace('$userName$', recommendedRestaurantData.name)
      .replace('$userName$', recommendedRestaurantData.name),
  })
}

type ContactUs = {
  name: string
  email: string
  phone: string
  message: string
}

export async function saveContactUs(contactUsData: ContactUs) {
  const doc = new GoogleSpreadsheet(
    '1nBaqTsg0ciRpYCfytL1KSvWK7tnuaKSwaljyppUygPE',
  )
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const recommendationSheet = await doc.sheetsByIndex[1]
  contactUsData.phone = contactUsData.phone.replace('+', '')
  await recommendationSheet.addRow(contactUsData)
}

export async function contactRestaurant(slug: any) {
  const { email } = await Shop.query().where({ slug }).first()
  await sendEmail({
    emails: [email],
    subject: '',
    html: '',
  })
}
