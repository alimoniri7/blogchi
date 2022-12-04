// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXu9UwNhB0SvEpbLlrcQ6mH_XzH1WKnm8",
  authDomain: "weblog-c4b3b.firebaseapp.com",
  projectId: "weblog-c4b3b",
  storageBucket: "weblog-c4b3b.appspot.com",
  messagingSenderId: "567361831326",
  appId: "1:567361831326:web:9745664bbe6f395ac9168f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth= getAuth(app)