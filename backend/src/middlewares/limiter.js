import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs:  15*60*1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
    message:'Too many requests!',
    statusCode:429
})

export const authLimiter =rateLimit ({
	windowMs:  15*60*1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
    message:'Too many requests!',
    statusCode:429
})

