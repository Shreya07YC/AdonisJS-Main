// app/Middleware/RoleMiddleware.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>, roles: string[]) {
    const user = auth.user
    console.log(user)
    // if (!user || !roles.includes(user.role)) {
    //   return response.unauthorized({ message: 'You do not have permission' })
    // }
    await next()
  }
}
