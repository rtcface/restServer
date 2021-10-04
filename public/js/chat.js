
const url = window.location.hostname.includes("localhost")
? "http://localhost:8081/api/auth/"
: "https://rest-server-rtc.herokuapp.com/api/auth/";


const lbUserOnline = document.getElementById('lbUserOnline');
const lbUserOnline01 = document.getElementById('lbUserOnline01');
const lbUserOnline02 = document.getElementById('lbUserOnline02');
const imgPathAvatar = document.getElementById('img-avatar');
const imgPathAvatar01 = document.getElementById('img-avatar01');

let user = null;
let socket = null;

const validateJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('there is no token in the request');
    }

    const resp = await fetch(url,{
        headers: { 'jwt-tk': token },
    });


    const { user:dbuser, token:dbtoken } = await resp.json();

    localStorage.setItem('token',dbtoken);

    user = dbuser;

    

    //console.log(dbuser,dbtoken);
    lbUserOnline.innerText = dbuser.name;
    lbUserOnline01.innerText = dbuser.name;
    lbUserOnline02.innerText = dbuser.name;
    imgPathAvatar.src = dbuser.img;
    imgPathAvatar01.src = dbuser.img;

    await socketConnneted();
}


const socketConnneted =  async () => {
     socket = io(
        {
            "extraHeaders": {
                "jwt-tk": localStorage.getItem('token')
            }
        });

        socket.on('connect', () => { 
            console.log("OnLine");
        });
        socket.on('disconnect', () => { 
            console.log("OffLine");
        });
        
        socket.on('receive-messages', () => { 
                // TODO:
        });
        socket.on('users-assets', (payload) => { 
                // TODO:
                console.log(payload);
        });
        socket.on('private-message', () => { 
                // TODO:
        });


}

const main = async() => {

    
    await validateJWT();

}

main();


//

const btnButton = document.getElementById( "sign_out" );

  btnButton.onclick = () => {
    //console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(
      localStorage.getItem('mail'), done => {
        localStorage.clear();
        location.reload();
      }
    );


  }

$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
        });