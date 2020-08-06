// listen for auth status changes
auth.onAuthStateChanged(user => {
    const pageUrl = document.location.href
    if (user) {
        console.log('user logged in: ', user);
        document.querySelector('.admin-action').style.display = 'block';

        if(pageUrl.endsWith('/signinpage/index.html')) {
            window.location.href = "../admin/index.html";
        }
    } else {
        console.log('user logged out');
        if(pageUrl.endsWith('/admin/index.html')) {
            window.location.href = "../signinpage/index.html";
        }
        // window.location.href = "../signinpage/index.html";
    }
})

// login
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get user info
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // close the signup modal & reset form
            loginForm.reset();
            window.location.href = "../admin/index.html";
        }).catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var messageDiv = document.querySelector('#message'); 
            messageDiv.innerHTML = errorMessage;
        });
   });
    
}

const logoutbutton = document.querySelector('#logout')
if(logoutbutton){
   logoutbutton.addEventListener('click', ev => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = "../signinpage/index.html";
    }).catch(function(error) {
        // An error happened.
        console.log(error)
    });
})

}

//-----------------------------------------------------------
// --------------------- Retrive contact Message ------------
//-----------------------------------------------------------

content = document.getElementById('contact-message')
if(content){
    db.collection("contacts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const toinsert  = `
          <hr>
          <div>Name: ${data.name} </div>
          <div>Email: ${data.email} </div>
          <div>Message: ${data.message} </div>
        `;
        content.innerHTML += toinsert
    });
});

}


//----------------------------------------------------
// ----------------------- BLOG POST FORM ------------
//----------------------------------------------------

const contactform = document.querySelector('#contactform');
const img_url = document.querySelector('#contactform #image');
const date = document.querySelector('#contactform #date');
const title = document.querySelector('#contactform #title'); 
const message = document.querySelector('#contactform #message');


//------------------- retrieve blogpost before update
//get the post_id from the url
const post_id = new URL(document.location.href).searchParams.get('post-id');

if(post_id){
  // we can retrieve the blogpost only if the post_id is available

  db.collection("posts").doc(post_id)
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      const data = doc.data();
      img_url.value = data.img_url;
      date.value = data.date;
      title.value = data.title;
      message.value = data.message;

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
       
}

// ---------------- add or update blogpost

contactform.onsubmit = function(e){
  e.preventDefault();

  if(post_id){
    // update
    db.collection("posts").doc(post_id).update({
        img_url: img_url.value,
        date: date.value,
        title: title.value,
        message: message.value
    })
    .then(function() {
        console.log("Document updated");
        img_url.value='';
        date.value='';
        title.value='';
        message.value='';
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }
  else{
    // insert or add
    db.collection("posts").add({
        img_url:img_url.value,
        date: date.value,
        title: title.value,
        message: message.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        image.value='';
        date.value='';
        title.value='';
        message.value='';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}

//------------------create an article ...........
//...............................................

contactform1 = document.getElementById('contactform1')
contactform1.onsubmit = function(e){
  e.preventDefault();

  image_url    = document.getElementById('image').value;
  Title = document.getElementById('title').value; 
  project_link = document.getElementById('link').value;
  category = document.getElementById('category').value;

  // console.log(name);

  db.collection("Articles").add({
      image_url: image_url,
      Title: Title,
      project_link: project_link,
      category: category
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('image').value='';
      document.getElementById('title').value='';
      document.getElementById('link').value='';
      document.getElementById('category').value='';

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
