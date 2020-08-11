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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

// send = document.getElementById('send')
// send.onclick = function(){

content = document.getElementById('content')

db.collection("contacts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data = doc.data()
        console.log(doc.id, data);

        // toinsert  = '<hr>'
        // toinsert += '<div>Name: '    + data.name + '</div>'
        // toinsert += '<div>Email: '   + data.email + '</div>'
        // toinsert += '<div>Message: ' + data.message + '</div>'

        toinsert  = `
          <hr>
          <div>Name: ${data.name} </div>
          <div>Email: ${data.email} </div>
          <div>Message: ${data.message} </div>
        `;

        console.log('toinsert:', toinsert)
        content.innerHTML += toinsert
    });
});