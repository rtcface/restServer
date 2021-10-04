
const url = window.location.hostname.includes("localhost")
? "http://localhost:8081/api/auth/"
: "https://rest-server-rtc.herokuapp.com/api/auth/";


const txtmessage = document.getElementById('txtmessage');
const listUsersOnline = document.querySelector('#listUsersOnline');
const boxMessage = document.querySelector('#boxMessage');
// const lbUserOnline01 = document.getElementById('lbUserOnline01');
// const lbUserOnline02 = document.getElementById('lbUserOnline02');
// const imgPathAvatar = document.getElementById('img-avatar');
// const imgPathAvatar01 = document.getElementById('img-avatar01');

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

    

    console.log(dbuser,dbtoken);
//     lbUserOnline.innerText = dbuser.name;
//    // lbUserOnline01.innerText = dbuser.name;
//     lbUserOnline02.innerText = dbuser.name;
//     imgPathAvatar.src = dbuser.img;
    //imgPathAvatar01.src = dbuser.img;

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
        
        socket.on('receive-messages', showMessage);
        socket.on('users-assets', showUsersOnline );
        socket.on('private-message', () => { 
                // TODO:
        });


}

txtmessage.addEventListener('keyup', ({ keyCode }) => {
    
    const message = txtmessage.value;

    if(keyCode !== 13){return;}
    if( message.length ===0 ) {return;}

    socket.emit('sendMessage',{message});

    if(keyCode === 13){ txtmessage.value="" }
   

});




const main = async() => {

    
    await validateJWT();

}

const showUsersOnline = ( listUsers = [] ) => {
    let usersHtml = '';

    listUsers.forEach( ( {img, name} ) => {

        usersHtml += `<li class="active">
        <div class="d-flex bd-highlight">
            <div class="img_cont">
                <img class="rounded-circle user_img" src="${ img }">
                <span class="online_icon"></span>
            </div>
            <div class="user_info">
                <span>${ name }</span>
                <p>${name} is online</p>
            </div>
        </div>
    </li> `;

    })

    listUsersOnline.innerHTML = usersHtml;
}

const showMessage = ( listMessage =[] ) => {
    let messageHtml = '';

    listMessage.forEach( ( {date,name,message,img} ) => {

        messageHtml += `
        <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="${ img }" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
        ${message}
           
            <span class="msg_time" >${ date }</span>
        </div>
        </div>
        `;
    })

    boxMessage.innerHTML=messageHtml;


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