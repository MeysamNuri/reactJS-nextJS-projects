import firebase from 'firebase';
import store from 'store-js'

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAlZEI7o2YDp1pkS_6BelaKoucXw6FWmZQ",
    authDomain: "daap-app.firebaseapp.com",
    databaseURL: "https://daap-app.firebaseio.com",
    projectId: "daap-app",
    storageBucket: "daap-app.appspot.com",
    messagingSenderId: "822953180091",
    appId: "1:822953180091:web:905b5eea026c863804e29e",
    measurementId: "G-V7CFFZ95SJ"
  });
  
  // navigator.serviceWorker
  //   .register('/firebase-messaging-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
}

export const askForPermissionToReceiveNotifications = async () => {
   try {
     const messaging = firebase.messaging();
    //  await messaging.requestPermission();
     const token = await messaging.getToken();
     store.set('fireBaseToken', token)
     return token;
   } catch (error) {
   }
 }