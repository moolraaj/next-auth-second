import vine from '@vinejs/vine'

export const registerSchema = vine.object({
  name: vine.string().minLength(4),
  email: vine.string(),
  password: vine.string().minLength(4).confirmed(),
  
})

export const LoginSchema = vine.object({
  email: vine.string(),
  password: vine.string().minLength(4)
  
})
