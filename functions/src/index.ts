import {setGlobalOptions} from "firebase-functions";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

setGlobalOptions({maxInstances: 10});

admin.initializeApp();

export const deleteUserByAdmin = onCall(async (request) => {
  // 🔐 Must be authenticated
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "User must be authenticated"
    );
  }

  // 🔐 Only allow your admin email
  if (request.auth.token.email !== "jodyverwey22@gmail.com") {
    throw new HttpsError(
      "permission-denied",
      "Only admin can delete users"
    );
  }

  const uid = request.data.uid;

  if (!uid) {
    throw new HttpsError(
      "invalid-argument",
      "UID is required"
    );
  }

  // 🔥 Delete from Authentication
  await admin.auth().deleteUser(uid);

  // 🔥 Delete Firestore user document
  await admin.firestore().doc(`users/${uid}`).delete();

  return {success: true};
});
