import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC-dp9QmH1nMfPJRb1pTLalhCNVz-UKQnY',
  authDomain: 'proshop-mern-321317.firebaseapp.com',
  projectId: 'proshop-mern-321317',
  storageBucket: 'proshop-mern-321317.appspot.com',
  messagingSenderId: '345201133892',
  appId: '1:345201133892:web:a97dc1e6d55296d7536f11',
  measurementId: 'G-2L3EQNVJ27',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
