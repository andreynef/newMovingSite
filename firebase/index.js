//https://www.youtube.com/watch?v=8r1Pb6Ja90o
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDQaPGVEq5NlN3p2a4QCu6KLwRQfgrU7cI",
  authDomain: "konstant-movers.firebaseapp.com",
  databaseURL: "https://konstant-movers.firebaseio.com",
  projectId: "konstant-movers",
  storageBucket: "konstant-movers.appspot.com",
  messagingSenderId: "354598966530",
  appId: "1:354598966530:web:ea2621f1172a3fbcf01e1b"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export {storage, firebase as default};