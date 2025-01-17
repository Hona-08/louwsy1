import { authConfig } from '../../config'
import { TABLES } from '../../constants'
import { ContactUs } from '../../models/shop'
import { OrderByDirection } from 'objection'
import { sendEmail } from '../../utils'

export type GetContactUs = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
}

export async function getContactUs({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
}: GetContactUs) {
  const query = await ContactUs.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder.where('name', 'like', `%${searchQuery}%`)
      }
    })
    .page(pageNumber, pageSize)
    .orderBy(sortBy, order as OrderByDirection)

  // if (sortBy?.length > 0) {
  //   query.orderBy(sortBy, order as OrderByDirection)
  // }

  const contactUs = await query
  return contactUs
}

export async function getContactUsById(id: string) {
  const contactUs = await ContactUs.query().where(`${TABLES.CONTACT_US}.id`, id)

  return contactUs
}

export async function createContactUs(contactUsDetails: ContactUs) {
  const contactUs = await ContactUs.query().insert(contactUsDetails)

  return
  const { subject, html, generateUrl } = authConfig.shop.confirmEmailMail

  await sendEmail({
    emails: [contactUsDetails.email],
    subject,
    html: '',
  })

  return contactUs
}
type UpdateContactUs = {
  contactUs: Partial<ContactUs>
  contactUsId: string
}
export async function updateContactUs({
  contactUs,
  contactUsId,
}: UpdateContactUs) {
  await ContactUs.query().patch(contactUs).where({
    id: contactUsId,
  })
}

export async function deleteContactUs(id: string) {
  await ContactUs.query().deleteById(id)
}
