// upstash configuration 

import {RateLimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config()

// 10 request per 20 seconds 
const rateLimit = new RateLimit({
    redis : Redis.fromEnv(),
    limiter : RateLimit.slidingWindow(10,"20 s")
    }
)

export default rateLimit