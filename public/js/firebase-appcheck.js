// public/js/firebase-appcheck.js
// Firebase App Check initialization for DevTouch
// Replace the config and site key with your actual values from Firebase Console

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider, isSupported } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "devtouch-d161c",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);

isSupported().then((supported) => {
  if (supported) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_V3_SITE_KEY'),
      isAppCheckDebug: true // Set to false in production!
    });
  } else {
    console.warn("App Check is not supported in this browser environment.");
  }
});

// Now you can use other Firebase services after this script loads.
