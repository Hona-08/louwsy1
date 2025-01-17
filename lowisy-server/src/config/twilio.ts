export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  verificationServiceId: process.env.TWILIO_VERIFICATION_SERVICE_ID,
  originator: process.env.TWILIO_ORIGINATOR,
} as const
