const axios = require('axios');

module.exports.mailTrigger = async (email) => {
    const url = 'https://in-automate.sendinblue.com/api/v2/trackEvent';
    const data = JSON.stringify({ email, event: 'sign_up' });
    await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'ma-key': 'nezz9z353byts09sgpotqeyz',
        },
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};
