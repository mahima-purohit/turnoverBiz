const ElasticEmail = require('@elasticemail/elasticemail-client');

const sendVerificationEmail = (recipientEmail, code) => {
    let defaultClient = ElasticEmail.ApiClient.instance;
    let apikey = defaultClient.authentications['apikey'];
    apikey.apiKey = process.env.ELASTIC_EMAIL_KEY;
    let api = new ElasticEmail.EmailsApi()
    let email = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
            new ElasticEmail.EmailRecipient(recipientEmail)
        ],
        Content: {
            Body: [
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: "HTML",
                    Content: `Your verification code is ${code}`
                })
            ],
            Subject: "Verification Code For TurnoverBiz",
            From: "turnoverbizappbymahima@gmail.com "
        }
    });

    var callback = function (error, data, response) {
        if (error) {
            console.error('Error in sending email', error);
        } else {
            console.log('Email send api called successfully.');
        }
    };
    api.emailsPost(email, callback);
}

module.exports = {
    sendVerificationEmail
}