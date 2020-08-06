// listen for auth status changes
auth.onAuthStateChanged(user => {
    const pageUrl = document.location.href
    if (user) {
        console.log('user logged in: ', user);
        document.body.className = 'login-handle';
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

content = document.getElementById('contact-message')

if(content){
    db.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data = doc.data()
        console.log(doc.id, data);

        toinsert  = `
          <div class="block"> 
              <div class="post-image"><img src="${data.img_url}" class="image"> </div>
              <div class="post-details">
                  <em>${data.date}</em>
                  <h4>${data.title}</h4>
                  <p>${data.message}...
                     <a class="more" href="#"> >>>> </a>
                  </p>
                  <div class='post-actions'>
                      <a href="../admin/index.html" data-id="${doc.id}" class="admin-action"><img src="./images/edit.png" id="crud" class="hvr-fade"></a>
                      <a href="#" data-id="${doc.id}" class="admin-action delete"><img src="./images/delete.png" id="crud"  class="hvr-fade"></a>
                      <a href="#"><img src="./images/like.png" class=" hvr-fade"></a>
                      <a href="#"><img src="./images/com.png" class=" hvr-fade"></a>
                      <a href="#"><img src="./images/sh.png" class=" hvr-fade"></a>
                  </div>
               </div>    
          </div>
        `;

        console.log('toinsert:', toinsert);
        content.innerHTML += toinsert;

        document.querySelectorAll('.admin-action.delete').forEach( el => {
            const id = el.getAttribute('data-id');
            const parent = el.parentElement.parentElement.parentElement;
            el.onclick = function(){
                console.log('deleted', id);
                db.collection("posts").doc(id).delete().then(function() {
                    console.log("Document successfully deleted!");
                    parent.remove();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        });

    });
});

}


const cruds = document.querySelectorAll('#crud');
console.log('cruds', cruds);
cruds.forEach( crud => {
   console.log('crud', crud);
   crud.addEventListener('click', ev => {
      window.location.href = "../admin/index.html";
    });
});
        
