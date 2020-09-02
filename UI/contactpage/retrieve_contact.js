//import Axios from "axios";

axios.get("http://mybrandanisie.herokuapp.com/query/all").then(function(response) {
  console.log(response.data)
  response.data.forEach((data) => {
      toinsert  = `
        <hr>
        <div>Name: ${data.name} </div>
        <div>Email: ${data.email} </div>
        <div>Message: ${data.message} </div>
      `;
      content.innerHTML += toinsert
  });
})
content = document.getElementById('content')

db.collection("contacts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data = doc.data()
        console.log(doc.id, data);
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