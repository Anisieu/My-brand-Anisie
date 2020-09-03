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
            window.location.href = "../index.html";
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
        axios.post("https://mybrandanisie.herokuapp.com/user/login",{
          email : loginForm['email'].value,
          password :loginForm['password'].value
       }).then(function(response){
         const token = response.data.token;
         localStorage.setItem("token",token);
         window.location.href = "../admin/index.html";
       })

   });
    
}

const logoutbutton = document.querySelector('#logout')
if(logoutbutton){
   logoutbutton.addEventListener('click', ev => {
    localStorage.setItem('token','');
    window.location.href = "../index.html";
    // firebase.auth().signOut().then(function() {
    //     // Sign-out successful.
    //     window.location.href = "../home/index.html";
    // }).catch(function(error) {
    //     // An error happened.
    //     console.log(error)
    // });
})

}

//-----------------------------------------------------------
// --------------------- Retrive comments ------------
//-----------------------------------------------------------



//-----------------------------------------------------------
// --------------------- Retrive contact Message ------------
//-----------------------------------------------------------

content = document.getElementById('contact-message')
if(content){
    let token=localStorage.getItem("token");
    axios.get("https://mybrandanisie.herokuapp.com/query/all",{
      headers:{token}
    }).then(function(response) {
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
  axios.get(`https://mybrandanisie.herokuapp.com/blog/${post_id}`).then(function(response){
    const data = response.data;
      image.value = data.image_ulr;
      date.value = data.date;
      title.value = data.title;
      message.value = data.content;
  })
  // we can retrieve the blogpost only if the post_id is available

  // db.collection("posts").doc(post_id)
  // .get()
  // .then(function(doc) {
  //   if (doc.exists) {
  //     console.log("Document data:", doc.data());
  //     const data = doc.data();
  //     img_url.value = data.img_url;
  //     date.value = data.date;
  //     title.value = data.title;
  //     message.value = data.message;

  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });
       
}

// ---------------- add or update blogpost

contactform.onsubmit = function(e){
  e.preventDefault();

  if(post_id){
    const img_url = document.querySelector('#contactform #image');
    const date = document.querySelector('#contactform #date');
    const title = document.querySelector('#contactform #title'); 
    const message = document.querySelector('#contactform #message');
    const token = localStorage.getItem("token");

    axios({
      method: 'PATCH',
      headers: {
        token
      },
      data: {
        date:"2020-09-02T00:00:00.000Z",
        image_ulr: img_url.value, 
        title :title.value,
        message : message.value
        
      },
      url: `https://mybrandanisie.herokuapp.com/blog/${post_id}`}).then(function(res) {
        console.log(res)
        contactform.reset();
        document.getElementById('confirm-message2').style.display='block';
        setTimeout(()=>{  
          document.getElementById('confirm-message2').style.display='none';
        }, 5000);
 
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }
  else{
    // insert or add
    let title = contactform.title.value;
    let image_ulr = contactform.image.value;
    let content = document.getElementById("message").value;
    let token=localStorage.getItem("token");
    axios.post("https://mybrandanisie.herokuapp.com/blog/create",{
      title: title,
      image_ulr:image_ulr,
      content: content

    },{
      headers:{
        token
      }
    })
    .then(function(res) {
        contactform.reset();
        document.getElementById('confirm-message2').style.display='block';
        setTimeout(()=>{  
          document.getElementById('confirm-message2').style.display='none';
        }, 5000);

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

  // db.collection("Articles").add({
  //     image_url: image_url,
  //     Title: Title,
  //     project_link: project_link,
  //     category: category
  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  //     document.getElementById('image').value='';
  //     document.getElementById('title').value='';
  //     document.getElementById('link').value='';
  //     document.getElementById('category').value='';
  //     document.getElementById('confirm-message1').style.display='block';
  //     setTimeout(()=>{  
  //       document.getElementById('confirm-message1').style.display='none';
  //     }, 5000);


  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });
}
