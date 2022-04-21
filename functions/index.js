// The Cloud Functions for Firebase SDK to create Cloud Functions
// and set up triggers.
// const functions = require("firebase-functions");
// // Initialize Typesense, requires installing Typesense dependencies:
// // https://github.com/typesense/typesense-js
// const Typesense = require("typesense");
// // The Firebase Admin SDK to access Firestore.
// const admin = require("firebase-admin");

// admin.initializeApp();

// // Typesense API keys are stored in functions config variables
// const TYPESENSE_ADMIN_API_KEY = functions.config().typesense.admin_api_key;
// const TYPESENSE_SEARCH_API_KEY = functions.config().typesense.search_api_key;

// const client = new Typesense.Client({
//   "nodes": [{
//     "host": "8vhgabwrmky6pz7cp-1.a1.typesense.net",
//     // where xxx is the ClusterID of your Typesense Cloud cluster
//     "port": "443",
//     "protocol": "https",
//   }],
//   "apiKey": TYPESENSE_ADMIN_API_KEY,
//   "connectionTimeoutSeconds": 2,
// });

// // Update the search index every time a blog post is written.
// // eslint-disable-next-line no-use-before-define
// exports.onWurkerWritten = functions.firestore.document('wurkers/{wurkersId}')
// .onWrite(async (snap, context) => {
//   // Use the 'nodeId' path segment as the identifier for Typesense
//   const id = context.params.wurkerId;

//   // If the note is deleted, delete the note from the Typesense index
//   if (!snap.after.exists) {
//     await client.collections('wurkers').documents(id).delete();
//     return;
//   }

//   // Otherwise, create/update the note in the the Typesense index
//   const wurker = snap.after.data();
//   await client.collections('wurkers').documents().upsert({
//     id,
//     displayName: wurker.displayName,
//     skill: wurker.skill,
//     rate: wurker.rate,
//     yearsOfExp: wurker.yearsOfExp,
//     highestEdu: wurker.highestEdu,
//     certsLicenses: wurker.certsLicenses,
//     availability: wurker.availability,
//     tags: wurker.tags,
//   });
// });
