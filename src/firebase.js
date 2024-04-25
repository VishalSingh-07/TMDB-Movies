import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  storageBucket: process.env.REACT_APP_storageBucket,
  projectId: process.env.REACT_APP_projectId,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const analytics = firebaseApp.analytics();
export default db;
export { auth, db, analytics };
