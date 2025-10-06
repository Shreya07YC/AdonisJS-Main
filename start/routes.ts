import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')

// Public routes
console.log('routes nahi chal rhe h ')
router.post('/register', [AuthController, 'register'])
console.log('register tk aai')
router.post('/login', [AuthController, 'login'])

// Protected route (requires login)
router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))

// Admin route
router
  .get('/admin', async () => {
    return { message: 'Welcome Admin!' }
  })
  .use(middleware.auth({ guards: ['api'] }))
// .middleware(['auth', 'role:admin'])

// User route
router
  .get('/user', async () => {
    return { message: 'Welcome User!' }
  })
  .use(middleware.auth({ guards: ['api'] }))
// .middleware(['auth', 'role:user'])
