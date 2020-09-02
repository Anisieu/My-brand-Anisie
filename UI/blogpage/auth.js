// // listen for auth status changes
function check_user_login(){
  const token = localStorage.getItem('token');
    const pageUrl = document.location.href
    if (token) {
        document.body.className = 'is-admin';
        if(pageUrl.endsWith('/signinpage/index.html')) {
            window.location.href = "../admin/index.html";
        }
    } else {
        console.log('user logged out');
        if(pageUrl.endsWith('/admin/index.html')) {
            window.location.href = "../home/index.html";
        }
        // window.location.href = "../signinpage/index.html";
    }
}

check_user_login();

// login
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get user info
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;
        // log the user in
        // auth.signInWithEmailAndPassword(email, password).then((cred) => {
        //     // close the signup modal & reset form
        //     loginForm.reset();
        //     window.location.href = "../admin/index.html";
        // }).catch(error => {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     var messageDiv = document.querySelector('#message'); 
        //     messageDiv.innerHTML = errorMessage;
        // });
    });

}

const logoutbutton = document.querySelector('#logout')
if (logoutbutton) {
    logoutbutton.addEventListener('click', ev => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href = "../home/index.html";
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

if (blogpost_content) {

    function insert_short(data, id) {
        const message = data.content.substring(0, 200);
        return `<div class="block"> 
              <div class="post-image"><img src="${data.image_ulr}" class="image"> </div>
              <div class="post-details">
                  <em>${data.date}</em>
                  <h4>${data.title}</h4>
                  <p>${message}<a class="more" href="?post-id=${id}"> &gt;&gt;&gt;&gt; </a>
                  </p>
                  <div class="post-actions">
                      <a href="../admin/index.html?post-id=${id}#blog-posts" class="for-admin"><img src="./images/edit.png"  class="hvr-fade"></a>
                      <a href="#" data-id="${id}" class="for-admin delete"><img src="./images/delete.png"  class="hvr-fade"></a>
                      <a class="liked" data-id="${id}" href="#"><img class="likes-images" src="./images/like.png" class=" hvr-fade"><div class="likes-number">${data.like || 0}</div></a>
                      <a  href="?post-id=${id}#comment-container"><img src="./images/com.png" class=" hvr-fade"></a>
                  </div>
               </div>    
          </div>
        `;
    }

    function insert_long(data, id) {
        return `
             <div class="post-image"><img src="${data.image_ulr}" class="image"> </div>
              <div class="post-details">
                  <em>${data.date}</em>
                  <h4>${data.title}</h4>
                  <p>${data.content}<a class="more" href="?post-id=${id}"> &gt;&gt;&gt;&gt; </a>
                  </p>
                  <div class="post-actions">
                      <a href="../admin/index.html?post-id=${id}#blog-posts" class="for-admin"><img src="./images/edit.png"  class="hvr-fade"></a>
                      <a href="#" data-id="${id}" class="for-admin delete"><img src="./images/delete.png" class="hvr-fade"></a>
                      <a  class="liked" href="#"><img src="./images/like.png" class=" hvr-fade"></a>
                      <a href="#"><img src="./images/com.png" class=" hvr-fade"></a>                      
                  </div>
               </div>
        `;
    }

    if (post_id) {
        axios.get(`https://mybrandanisie.herokuapp.com/blog/${post_id}`).then(function(response) {
            const data = response.data;
            blogpost_content.innerHTML += insert_long(data, post_id);
            comment_content.style.display = 'block';
        })
        axios.get(`https://mybrandanisie.herokuapp.com/blog/${post_id}/comment`).then(function(res) {
            const data = res.data;
            console.log(data)
            data.forEach((comment) => {

                const toinsert = `
                <div class="my-comments">
                    <hr>
                    <div>Name: ${comment.name} </div>
                    <div>Email: ${comment.email} </div>
                    <div>Comment: ${comment.message} </div>
                </div>
                `;
                comment_content.innerHTML += toinsert
            })

        })

        // db.collection("comments").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         const data = doc.data();
        //         const toinsert  = `
        //           <div class="my-comments">
        //               <hr>
        //               <div>Name: ${data.user_name} </div>
        //               <div>Email: ${data.user_email} </div>
        //               <div>Comment: ${data.user_comment} </div>
        //           </div>
        //         `;

        //         if(data.post_id==post_id){
        //            comment_content.innerHTML += toinsert 
        //         }

        //     });
        // });
        // comment_content.innerHTML += 'insert comment'
        // } else {
        //   console.log("No such document!")
        // }}).catch(function(error) {
        //   console.log("Error getting document:", error)
        // });

        setTimeout(() => {
            console.log('comment form')
                //---comment form
            document.getElementById('commentform').addEventListener('submit', function(e) {
                e.preventDefault();
                user_name = document.getElementById('user_name').value;
                user_email = document.getElementById('user_email').value;
                user_comment = document.getElementById('user_comment').value;
                axios.post(`https://mybrandanisie.herokuapp.com/blog/${post_id}/comment`, {
                        name: user_name,
                        email: user_email,
                        message: user_comment,
                    }).then(function(res) {
                        console.log(res)
                        commentform.reset();
                        document.getElementById('confirm-message3').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('confirm-message3').style.display = 'none';
                        }, 5000);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
            });
        }, 9000);

    } else {
        //--- DISPLAY Many Blog Post
        axios.get("https://mybrandanisie.herokuapp.com/blog/all").then(function(response) {
            response.data.forEach((doc) => {
                blogpost_content.innerHTML += insert_short(doc, doc._id);


            });
            
            document.querySelectorAll('.post-actions .liked').forEach(el => {
                el.onclick = function(){
                    const id = el.getAttribute('data-id');
                    axios.put(`https://mybrandanisie.herokuapp.com/blog/${id}/like`).then(function(response) {
                      data = response.data;
                      location.reload();
                    });
                }
            });
            const token = localStorage.getItem('token');
            document.querySelectorAll('.post-actions .delete').forEach(el => {
                const id = el.getAttribute('data-id');
                const parent = el.parentElement.parentElement.parentElement;
                el.onclick = function(){
                    axios.delete(`https://mybrandanisie.herokuapp.com/blog/${id}`,{
                    headers:{
                        token
                    }
                    
                }).then(function(res) {
                    alert("deleted successfully");
                    location.reload();
                    });

                }  
            });
        });
    }   
}

// --------------- Retrieve project
const mobile_content = document.querySelector('.mobile-project')
const datascience_content = document.querySelector('.data-science')

if (mobile_content && datascience_content) {
    db.collection("Articles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const toinsert = `
               <div class="project">
                    <img src="${data.image_url}" class="image">
                    <div>${data.Title} <a href="${data.project_link}" class="project-link"><img src="./images/git.png"> GitHub</a></div>
                </div>
        `;
            if (data.category == 'mobile')
                mobile_content.innerHTML += toinsert;
            else if (data.category == 'datascience')
                datascience_content.innerHTML += toinsert;
        });
    });



}
//....................................................
//......................Update profile................
//....................................................



//--------------------------- DISPLAY COUNT

notif1_content = document.querySelector('.notif1')
if (notif1_content) {
    db.collection("Articles").get().then((querySnapshot) => {
        console.log('Count of element:', querySnapshot.size)
        notif1_content.insertAdjacentHTML('afterbegin', `<div>${querySnapshot.size}</div>`);
    });
}

notif2_content = document.querySelector('.notif2')
if (notif2_content) {
    db.collection("posts").get().then((querySnapshot) => {
        console.log('Count of element:', querySnapshot.size)
        notif2_content.insertAdjacentHTML('afterbegin', `<div>${querySnapshot.size}</div>`);
    });
}