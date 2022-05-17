import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCr9oSPSr9iKJ4skIt5YmYzS7J8DERGyFc',
  authDomain: 'instagram-replica-4e322.firebaseapp.com',
  databaseURL: 'https://instagram-replica-4e322-default-rtdb.firebaseio.com',
  projectId: 'instagram-replica-4e322',
  storageBucket: 'instagram-replica-4e322.appspot.com',
  messagingSenderId: '521369782407',
  appId: '1:521369782407:web:68db903480a535bedad022',
  measurementId: 'G-9QBJWMVCRB',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
