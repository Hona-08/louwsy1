import axios from 'axios'
import { BadRequestError } from '../../errors'

interface VatValidationResponse {
  valid: boolean
  countryCode: string
  vatNumber: string
  name?: string
  address?: string
}

export async function validateVatNumber(vatNumber: string): Promise<boolean> {
  const apiUrl = `https://api.vatcomply.com/vat?vat_number=${vatNumber}`
  console.log({ apiUrl })
  try {
    const response = await axios.get<VatValidationResponse>(apiUrl)
    console.log({ response })
    return response.data.valid
  } catch (error) {
    //console.error(`An error occurred during VAT number validation: ${error}`);
    throw new BadRequestError('INVALID_VAT_NUMBER')
  }

  return false
}
