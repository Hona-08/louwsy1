import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'express-async-errors'
import shopAuthRoutes from './routes/shops/auth.route'
import shopSettingRoutes from './routes/shops/settings.route'
import shopPolicyRoutes from './routes/shops/policy.route'
import shopProductRoutes from './routes/shops/product.route'
import shopCustomerRoutes from './routes/shops/customer.route'
import pricingPlanRoutes from './routes/admin/pricing-plan.route'
import shopLogisticRoutes from './routes/shops/logistics.route'
import shopPaymentRoutes from './routes/shops/payment-method.route'
import shopDeliveryRoutes from './routes/shops/delivery.route'
import commonRoutes from './routes/common.route'
import shopPaymentMethodRoutes from './routes/shops/payment-method.route'
import shopRoutes from './routes/shops/shop-details.route'
import shopRatingRoutes from './routes/shops/rating.route'
import shopContactUs from './routes/shops/contact-us.route'
import shopOrderRoutes from './routes/shops/order.route'
import shopCategoryRoutes from './routes/shops/category.route'
import shopOrderCountRoutes from './routes/shops/order-count.route'
import adminAuthRoutes from './routes/admin/auth.route'
import adminShopRoutes from './routes/admin/shop.route'
import adminCategoriesRoutes from './routes/admin/categories.route'
import adminDeliveryRoutes from './routes/admin/delivery.route'
import adminLogisticsRoutes from './routes/admin/logistics.route'
import adminPolicyRoutes from './routes/admin/policy.route'
import adminSettingsRoutes from './routes/admin/settings.route'
import paypalRoute from './routes/common/paypal.route'
import { errorHandler, setLang } from './middlewares'
import { NotFoundError } from './errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { customerAuthRoutes } from './routes/customer'
import { customerRoutes } from './routes/customer'
import passport from 'passport'
import { socialMediaLogin } from './utils/auth/socialMedia'
import expressSession from 'express-session'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSObjection from '@adminjs/objection'
import { Admin, Shop } from './models'
import { componentLoader, Components } from './admin-ui/component'
import importExportFeature from '@adminjs/import-export'
import { validateVatNumber } from './utils/common/vatValidation'

const app = express()
app.use(setLang)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
const corsOptions = {
  origin: [
    process.env.CORS_URL_LOWISY,
    'http://localhost:3000',
    'http://localhost:8081',
    'http://localhost:8082',
    'https://www.lowisy.com',
    'https://uat-admin.lowisy.com',
    process.env.CORS_URL_LOWISY_RESTAURANT,
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// AdminJS.registerAdapter({
//   Resource: AdminJSObjection.Resource,
//   Database: AdminJSObjection.Database,
// })

// const admin = new AdminJS({
//   //   pages: {
//   //     test: { // name, will be used to build an URL
//   //         component: Components.Test,
//   //     }
//   // },
//   dashboard: {
//     component: Components.Test,
//   },
//   resources: [
//     { resource: Admin, features: [importExportFeature()] },
//     { resource: Shop, features: [importExportFeature()] },
//   ],
//   componentLoader,
//   branding: {
//     companyName: 'Lowisy',
//     logo: 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy.svg',
//     withMadeWithLove: false,
//   },
// })

// admin.watch()

// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// }

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN)
//   }
//   return null
// }
// const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//   admin,
//   {
//     authenticate,
//     cookieName: 'adminjs',
//     cookiePassword: 'sessionsecret',
//   },
//   null,
//   {
//     resave: true,
//     saveUninitialized: true,
//     secret: 'sessionsecret',
//     cookie: {
//       httpOnly: process.env.NODE_ENV === 'production',
//       secure: process.env.NODE_ENV === 'production',
//     },
//     name: 'adminjs',
//   },
// )
// app.use(admin.options.rootPath, adminRouter)

//passport-initialize
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

//login with google
socialMediaLogin()

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// shop routes
app.use('/api/shops/auth', shopAuthRoutes)
app.use('/api/shops/settings', shopSettingRoutes)
app.use('/api/shop/policy', shopPolicyRoutes)
app.use('/api/shops/payment-method', shopPaymentRoutes)
app.use('/api/shops/logistics', shopLogisticRoutes)
app.use('/api/shops/products', shopProductRoutes)
app.use('/api/shops/customers', shopCustomerRoutes)
app.use('/api/shops/orders', shopOrderRoutes)
app.use('/api/shops/categories', shopCategoryRoutes)
app.use('/api/shops/ratings', shopRatingRoutes)
app.use('/api/shops', shopRoutes)
app.use('/api/delivery', shopDeliveryRoutes)
app.use('/api/shops/payment-method', shopPaymentMethodRoutes)
app.use('/api/shops/orders/orders-count', shopOrderCountRoutes)

// admin routes
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/admin/shops', adminShopRoutes)
app.use('/api/admin/categories', adminCategoriesRoutes)
app.use('/api/shops/contact-us', shopContactUs)
app.use('/api/admin/pricing-plan', pricingPlanRoutes)
app.use('/api/admin/delivery', adminDeliveryRoutes)
app.use('/api/admin/logistics', adminLogisticsRoutes)
app.use('/api/admin/policies', adminPolicyRoutes)
app.use('/api/admin/settings', adminSettingsRoutes)

//customer routes
app.use('/api/customers/auth', customerAuthRoutes.default)
app.use('/api/customers', customerRoutes.default)

//common routes
app.use('/api/common', commonRoutes)
app.use('/api/paypal', paypalRoute)

app.all('*', async (_req, _res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { server, io }
