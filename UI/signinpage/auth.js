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

content = document.getElementById('contact-message')

if(content){
    db.collection("contacts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data = doc.data()
        console.log(doc.id, data);

        // toinsert  = '<hr>'
        // toinsert += '<div>Name: '    + data.name + '</div>'
        // toinsert += '<div>Email: '   + data.email + '</div>'
        // toinsert += '<div>Message: ' + data.message + '</div>'

        
        //var img= 'https://www.mcall.com/resizer/iZP1aIg2hjV_66rPPDZS7Veccz8=/415x276/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/HWKWISLVNBCRTFQXBUATLA7BWI.jpg'
        //<img src='${img}'></div>

        
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

}



