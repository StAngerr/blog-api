const {getGraphQLRateLimiter} = require("graphql-rate-limit");
const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

async function checkRateLimit(parent, args, context, info) {
    const errorMessage = await rateLimiter(
        { parent, args, context, info },
        { max: 3, window: '10s' }
    );
    if (errorMessage) throw new Error(errorMessage);
}

module.exports = {
    checkRateLimit
}