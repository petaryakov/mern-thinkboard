import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        // in limit() i can pass the user id and this way each user has a different session with rate limits
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) {
            return res.status(429).json({
                message:"Too many request, please try again later"
            });
        }

        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;