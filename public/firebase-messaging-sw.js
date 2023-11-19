// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDicCTp6eBqxyWwnb_fz2ms3GcxsWx2smY",
  authDomain: "newagent-9c30f.firebaseapp.com",
  databaseURL: "https://newagent-9c30f.firebaseio.com",
  projectId: "newagent-9c30f",
  storageBucket: "newagent-9c30f.appspot.com",
  messagingSenderId: "157222433127",
  appId: "1:157222433127:web:039a9be7d3bfd1ed2fffc2",
  measurementId: "G-16R4Q0M4H0"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  console.log(payload);

  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
