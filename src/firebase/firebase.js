import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// استبدل هذه القيم بالقيم التي نسختها من لوحة تحكم Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // يجب أن تضع الـ Key الحقيقي هنا
  authDomain: "site-a9b75.firebaseapp.com",
  projectId: "site-a9b75",
  storageBucket: "site-a9b75.appspot.com",
  messagingSenderId: "415039659747",
  appId: "YOUR_APP_ID" // يجب أن تضع الـ App ID الحقيقي هنا
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
