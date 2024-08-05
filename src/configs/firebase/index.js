const admin = require("firebase-admin");
const serviceAccount = require("../../../cozy-corner-2903-firebase-adminsdk-jdzpj-3a58dee574.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://cozy-corner-2903.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
