importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAlZEI7o2YDp1pkS_6BelaKoucXw6FWmZQ",
    authDomain: "daap-app.firebaseapp.com",
    databaseURL: "https://daap-app.firebaseio.com",
    projectId: "daap-app",
    storageBucket: "daap-app.appspot.com",
    messagingSenderId: "822953180091",
    appId: "1:822953180091:web:57daaaef6e75781304e29e",
    measurementId: "G-MDJV7XFB76"
});

const messaging = firebase.messaging();