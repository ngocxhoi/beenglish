import ImageKit from '@imagekit/nodejs'

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const { token, expire, signature } = client.helper.getAuthenticationParameters()

  return { token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY }
})
