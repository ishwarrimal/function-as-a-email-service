const MAILGUN_API_KEY = "api key"
const MAILGUN_DOMAIN = "your domain"


exports.handler = async (event, _context, callback) => {
    const mailgun = require("mailgun-js");
    const mg = mailgun({
        apiKey: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN
    });
    const data = JSON.parse(event.body)
    const email = {
        from: 'Handsome Me <handsomeme@coconut.com>',
        to: `${data.name} <${data.email}>`,
        subject: data.subject,
        text: data.body
    }
    mg.messages().send(email, (error, resp) => {
        callback(error, {
            statusCode: 200,
            body: JSON.stringify(resp)
        })
    })
}