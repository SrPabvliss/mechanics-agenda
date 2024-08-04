importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCWvzupAokC9YREnP8JIHTNZL44Z1DSQxs",
  authDomain: "mechanics-schedule.firebaseapp.com",
  projectId: "mechanics-schedule",
  storageBucket: "mechanics-schedule.appspot.com",
  messagingSenderId: "195865247278",
  appId: "1:195865247278:web:2a9fbadaad21b0e066a9bf"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  if (payload.notification) return;
  
  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./logo.png",
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});