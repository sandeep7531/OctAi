import { initializeApp, cert } from "firebase-admin/app";

import serviceAccount from "../firebaseAdminkey.json" with { type: "json" };

export const firebaseapp = initializeApp({
  credential: cert(serviceAccount),
});
