module.exports = {
    MongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@buymovietickets-yabba.mongodb.net/test?retryWrites=true`,
    sendgrid_APIKey: process.env.SENDGRID_APIKEY
}

