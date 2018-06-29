const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.verifyInvitation = functions.https.onRequest((request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    return admin.database().ref('config/invitation_code').once('value', (snapshot) => {
        if (snapshot.val() === request.query.code) {
            response.status(200).send("OK");
        } else {
            console.log("wrong input:" + request.query.code);
            response.status(400).send('not OK');
        }
    }).catch(error => {
        console.log(erro);
        response.status(500).send(error);
    })
});