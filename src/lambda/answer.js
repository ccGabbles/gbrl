const axios = require('axios');

exports.handler = (event, context, callback) => {
    const EnvSpecificHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
    };

    const send = body => {
        // Helperfunction, send back as response
        callback(null, {
            statusCode: 200,
            headers: EnvSpecificHeaders,
            body: JSON.stringify(body)
        });
    };

    const submitAnswer = () => {
        // Parse the field information from the post
        const { answer } = JSON.parse(event.body);
    
        let easterEgg = 'ACCESS DENIED';
        let secret = 'ACCESS DENIED';
        if (answer.toLowerCase() === 'jamstack') {
            easterEgg = "https://8a4f3e3bf82e35bc1962-b846bdba27aa3818c316057133002901.ssl.cf3.rackcdn.com/Strawberry_jar-_cFzZQVn.png";
            secret = "🍓";
        }

        send({
            "event": "Composable Commerce with commercetools",
            "date": "Tuesday, 23 March 2021 19:30:00",
            "host": "Bart Kooijman",
            "sessions": [{
                "subject": "Roundtable on Composable commerce",
                "speakers": "Robert Kooloos, Frank van de Kreeke & Arin Roy"
            }, {
                "subject": "An Introduction to commercetools",
                "speaker": "Ashish Monga"
            }, {
                "subject": "Building a jamstack and commercetools powered webshop",
                "speaker": "Gabriël Moawad"
            }],
            "cracked the code?": answer.toLowerCase() === 'jamstack',
            "easterEgg": easterEgg,
            "secret": secret
        });
    };

    // Only respond to POST request
    if (event.httpMethod === 'POST') {
        // Only respond to POST with answer in body
        if (event.body.includes('answer')) {
            submitAnswer();
        } else {
            send('missing answer parameter');
        }
    } else if (event.httpMethod === 'OPTIONS' ) {
        // enable preflight CORS approval
        send();
    } else {
        send('only accepting post');
    }
};
