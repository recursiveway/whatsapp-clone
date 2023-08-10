import express from 'express'
import authRoutes from './auth.route.js'
// import ConversationRoutes from './conservsation.route.js'

const router = express.Router();

router.use('/auth', authRoutes)
// router.use('/conversation', () => res.send('hello'))

export default router