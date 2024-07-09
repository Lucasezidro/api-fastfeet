import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { env } from './env'

export const app = fastify()

app.register(fastifyCors)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
