contactform = document.getElementById('contactform')
contactform.onsubmit = function(e){
  e.preventDefault();

  axios.post('https://mybrandanisie.herokuapp.com/query/create', {
   
    name : document.getElementById('fname').value,
    email : document.getElementById('lname').value,
    message : document.getElementById('subject').value 
}).then(function(response) {
    console.log(response.data)
    document.getElementById('fname').value='';
    document.getElementById('lname').value='';
    document.getElementById('subject').value='';
    
    document.getElementById('confirm-message').style.display='block';
    setTimeout(()=>{  
      document.getElementById('confirm-message').style.display='none';
    }, 5000);

})
  
//   name    = document.getElementById('fname').value;
//   email   = document.getElementById('lname').value;
//   message = document.getElementById('subject').value; 

//   // console.log(name);

//   db.collection("contacts").add({
//       name: name,
//       email: email,
//       message: message
//   })
//   .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//       document.getElementById('fname').value='';
//       document.getElementById('lname').value='';
//       document.getElementById('subject').value='';
      
//       document.getElementById('confirm-message').style.display='block';
//       setTimeout(()=>{  
//         document.getElementById('confirm-message').style.display='none';
//       }, 5000);

//   })
//   .catch(function(error) {
//       console.error("Error adding document: ", error);
//   });
 }