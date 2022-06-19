import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.css'

import { initializeApp } from "firebase/app";

// createApp(App).use(store).use(router).mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyB3SC-JjEngStWEIS-rAMd8JKwY-bRqkzo",
  authDomain: "schedular-app-65a9e.firebaseapp.com",
  databaseURL: "https://schedular-app-65a9e-default-rtdb.firebaseio.com",
  projectId: "schedular-app-65a9e",
  storageBucket: "schedular-app-65a9e.appspot.com",
  messagingSenderId: "293332480735",
  appId: "1:293332480735:web:a4f95f26b6f94b49a0ef6a"
};

initializeApp(firebaseConfig);

// const App = {
//   data() {
//     return {
//       visvis: true
//     }
//   }
// }
const app = createApp(App);
// app.visvis = true;
app.use(store);
app.use(router);
app.mount('#app');
