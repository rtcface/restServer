loginForm = document.querySelector('form');


const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8081/api/auth/"
  : "https://rest-server-rtc.herokuapp.com/api/auth/";
  


//   function onSignIn(googleUser) {
// //   var profile = googleUser.getBasicProfile();
// //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
// //   console.log("Name: " + profile.getName());
// //   console.log("Image URL: " + profile.getImageUrl());
// //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

//   var id_token = googleUser.getAuthResponse().id_token;

//   const data = { id_token };
//   console.log(data);
//   console.log(url);
//   fetch(url+"login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then(({ token }) => {
//         localStorage.setItem("token", token);
//     })
//     .catch(console.log);
// }

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log("User signed out.");
//   });
// }

loginForm.addEventListener("submit", ev => {
  ev.preventDefault();
  const formData={};

  for (let item of loginForm.elements) {
    if(item.name.length > 0 ){
      formData[item.name] =item.value;
    }      
  }
  //console.log(formData);
  fetch(url+'login', {
    method: 'POST',
    headers: {'Content-Type' : "application/json"},
    body: JSON.stringify( formData ), 
  })
  .then( resp => resp.json())
  .then( ({msg,token}) =>{
    //console.log(msg);
    if(msg){
      return console.error(msg);
    }

     localStorage.setItem('token', token);
     window.location = 'chat.html'
  })
  .catch (err => 
    {
      console.error(err)
    }
    )
  });

function handleCredentialResponse(response) {
  
  //console.log('id_token',response.credential);
  const body = { id_token: response.credential };
  fetch(url+'google',
  { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  )
      .then( resp => resp.json())
      .then( resp => {
        const { token } = resp;
        localStorage.setItem('token', token);
        window.location = 'chat.html';
       
      }).catch( console.warn );

     
}



