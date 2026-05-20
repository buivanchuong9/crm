importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "mock",
  authDomain: "mock.local",
  projectId: "mock",
  storageBucket: "mock.local",
  messagingSenderId: "000000000000",
  appId: "mock",
};

if (firebaseConfig.apiKey !== "mock") {
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  // Xử lý thông báo ở chế độ nền
  messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}