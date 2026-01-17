// upstash configuration 

import { Ratelimit } from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config()

Ratelimit
// 10 request per 20 seconds 
const rateLimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(60,"60 s")
    }
)

export default rateLimit