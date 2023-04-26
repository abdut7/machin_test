
const STR_MAIN_DB = 'cus'
const arrQuestens = [
    {
        "strQuesten":"How satisfied are you with our products?",
        "type":"Rating",
        "intSlNo":1,
        intRateLimit:5
    },
    {
        "strQuesten":"2. How fair are the prices compared to similar retailers?",
        "type":"Rating",
        "intSlNo":2,
        intRateLimit:5
    },
    {
        "strQuesten":"How satisfied are you with the value for money of your purchase?",
        "type":"Rating",
        "intSlNo":3,
        intRateLimit:5
    },
    {
        "strQuesten":"On a scale of 1-10 how would you recommend us to your friends and family?",
        "type":"Rating",
        "intSlNo":4,
        intRateLimit:10
    },
    {
        "strQuesten":"What could we do to improve our service?",
        "type":"Text",
        "intSlNo":5
    }
]
module.exports = {
    STR_MAIN_DB,
    arrQuestens
}