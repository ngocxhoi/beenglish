import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailVerify = async (email: string, token: string) => {
  const response = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Email verification',
    html: `<strong>Click here to verify your email: ${process.env.BASE_URL}/vi/auth/verify?token=${token}</strong>`
  })

  if (response.error) {
    throw createError({
      statusCode: 500,
      message: 'Error sending email'
    })
  }

  return response
}
