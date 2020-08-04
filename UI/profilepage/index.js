// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBVhxK4NSd4vgDShVQ_sT7NFTjbx3oJ0QU",
authDomain: "anisie-brand.firebaseapp.com",
databaseURL: "https://anisie-brand.firebaseio.com",
projectId: "anisie-brand",
storageBucket: "anisie-brand.appspot.com",
messagingSenderId: "86557101911",
appId: "1:86557101911:web:6db2a963eac38788f43812",
measurementId: "G-MGXRQXKW5X"
};
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore(); 