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

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
* Overrides push notification data, to avoid having 'notification' key and firebase blocking
* the message handler from being called
*/
self.addEventListener('push', (e) => {
  console.log('push', e);
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, image, ...restPayload } = payload.data;
  const notificationOptions = {
    body,
    icon: image || '/icons/firebase-logo.png', // path to your "fallback" firebase notification logo
    data: restPayload,
  }; s
  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  if (event?.notification?.data && event?.notification?.data?.link) {
    self.clients.openWindow(event.notification.data.link);
  }

  // close notification after click
  event.notification.close();
});