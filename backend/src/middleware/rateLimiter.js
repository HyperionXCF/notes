import rateLimit from "../configs/upstash"

const rateLimiter = async (_, res, next) => {
    try{
        // here if you have auth, you will create 
        // user-id : requests keyvalue pair
        // here we are hardcoding the key
        // another way could be rate limiting based on ip address
        const {success} = await rateLimit.limit("user-id")

        if(!success){
            return res.status(429).json({
                message : "too many requests"
            })
        }

        next()
    }catch(err){
        console.log(`rate limit error`, err.message)
        next(err)
    }
}

export default rateLimiter