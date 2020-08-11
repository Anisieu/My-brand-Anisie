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

//---------------- Retrieve blog posts


const blogpost_content = document.querySelector('#blog-post-container')
const comment_content = document.querySelector('#comment-container')
const post_id = new URL(document.location.href).searchParams.get('post-id');

if(blogpost_content){
    
    function insert_short(data, id){
        const message = data.message.substring(0, 200);
        return `<div class="block"> 
              <div class="post-image"><img src="${data.img_url}" class="image"> </div>
              <div class="post-details">
                  <em>${data.date}</em>
                  <h4>${data.title}</h4>
                  <p>${message}<a class="more" href="?post-id=${id}"> &gt;&gt;&gt;&gt; </a>
                  </p>
                  <div class="post-actions">
                      <a href="../admin/index.html?post-id=${id}#blog-posts" class="admin-action"><img src="./images/edit.png" id="crud" class="hvr-fade"></a>
                      <a href="#" data-id="${id}" class="admin-action delete"><img src="./images/delete.png" id="crud" class="hvr-fade"></a>
                      <a class="liked" href="#"><img class="likes-images" src="./images/like.png" class=" hvr-fade"><div class="likes-number">${data.like}</div></a>
                      <a  href="?post-id=${id}#comment-container"><img src="./images/com.png" class=" hvr-fade"></a>
                  </div>
               </div>    
          </div>
        `;
    }
       
    function insert_long(data, id){
        return `
              <div class="post-details">
                  <em>${data.date}</em>
                  <h4>${data.title}</h4>
                  <p>${data.message}<a class="more" href="?post-id=${id}"> &gt;&gt;&gt;&gt; </a>
                  </p>
                  <div class="post-actions">
                      <a href="../admin/index.html?post-id=${id}#blog-posts" class="admin-action"><img src="./images/edit.png" id="crud" class="hvr-fade"></a>
                      <a href="#" data-id="${id}" class="admin-action delete"><img src="./images/delete.png" id="crud" class="hvr-fade"></a>
                      <a  class="liked" href="#"><img src="./images/like.png" class=" hvr-fade"></a>
                      <a href="#"><img src="./images/com.png" class=" hvr-fade"></a>                      
                  </div>
               </div>
        `;
    }

    if(post_id){
        //---- Display one blog post
        db.collection("posts").doc(post_id).get().then(function(doc) {
        if (doc.exists){
            data = doc.data();
            blogpost_content.innerHTML += '<a href="index.html">Back</a><br>'
            blogpost_content.innerHTML += insert_long(data, doc.id);
            // display comment
            comment_content.style.display = 'block';


            db.collection("comments").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const toinsert  = `
                      <div class="my-comments">
                          <hr>
                          <div>Name: ${data.user_name} </div>
                          <div>Comment: ${data.user_comment} </div>
                      </div>
                    `;
                    
                    if(data.post_id==post_id){
                       comment_content.innerHTML += toinsert 
                    }
                    
                });
            });
          //comment_content.innerHTML += 'insert comment'
        } else {
          console.log("No such document!")
        }}).catch(function(error) {
          console.log("Error getting document:", error)
        });

        setTimeout(()=>{
            console.log('comment form')
            //---comment form
            document.getElementById('commentform').addEventListener('submit', function(e){
              e.preventDefault();

              user_name    = document.getElementById('user_name').value;
              user_comment = document.getElementById('user_comment').value; 

              // console.log(name);

              db.collection("comments").add({
                  user_name: user_name,
                  user_comment: user_comment,
                  post_id:post_id
              })
              .then(function(docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  document.getElementById('user_name').value='';
                  document.getElementById('user_comment').value='';
                  document.getElementById('confirm-message3').style.display='block';
                  setTimeout(()=>{  
                       document.getElementById('confirm-message3').style.display='none';
                  }, 5000);
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });
            });
        },9000);

    }
    else{
        //--- DISPLAY Many Blog Post
        db.collection("posts").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data = doc.data()
            // console.log(doc.id, data);

            blogpost_content.innerHTML += insert_short(data, doc.id);
            var like_number = document.querySelectorAll(".likes-number")
            var like_image = document.querySelectorAll(".likes-images")

            like_image.forEach((images, i) => {
              images.addEventListener('click', () => {
                  //console.log("liked", i)
                  like_number[i].innerText++;
                  data.like==likes-number;
              });
            });

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


}

// --------------- Retrieve project
const mobile_content = document.querySelector('.mobile-project')
const datascience_content = document.querySelector('.data-science')

if(mobile_content && datascience_content){
    db.collection("Articles").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const toinsert  = `
               <div class="project">
                    <img src="${data.image_url}" class="image">
                    <div>${data.Title} <a href="${data.project_link}" class="project-link"><img src="./images/git.png"> GitHub</a></div>
                </div>
        `;
        if(data.category == 'mobile')
            mobile_content.innerHTML += toinsert;
        else if(data.category == 'datascience')
            datascience_content.innerHTML += toinsert;
      });
    });

    

}
//....................................................
//......................Update profile................
//....................................................



//--------------------------- DISPLAY COUNT

notif1_content = document.querySelector('.notif1')
if(notif1_content){
    db.collection("Articles").get().then((querySnapshot) => {
        console.log('Count of element:', querySnapshot.size)
        notif1_content.insertAdjacentHTML('afterbegin', `<div>${querySnapshot.size}</div>`);
  });
}

notif2_content = document.querySelector('.notif2')
if(notif2_content){
    db.collection("posts").get().then((querySnapshot) => {
        console.log('Count of element:', querySnapshot.size)
        notif2_content.insertAdjacentHTML('afterbegin', `<div>${querySnapshot.size}</div>`);
  });
}
   
