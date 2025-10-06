import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Register
  public async register({ request, response }: HttpContext) {
    console.log('hello')
    const data = request.only(['full_name', 'email', 'password', 'role'])
    const user = await User.create(data)
    return response.created({ user })
  }

  // Login
  public async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)

    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await auth.use('api').createToken(user)
    return response.ok({ token, user })
  }

  // public async login({ auth, request, response }: HttpContext) {
  //   const { email, password } = request.only(['email', 'password'])
  //   const user = await User.findBy('email', email)

  //   if (!user || !(await hash.verify(user.password, password))) {
  //     return response.unauthorized({ message: 'Invalid credentials' })
  //   }

  //   const token = await auth.use('api').createToken(user)
  //   return response.ok({ token, user })
  // }

  // Current user info
  public async me({ auth, response }: HttpContext) {
    return response.ok({ user: auth.user })
  }
}
