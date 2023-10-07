function data1() {

  
        fetch("http://127.0.0.1:8000/users")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
                console.log(data);
                displaydata(data);
           
        })
        .catch((err) => {
            console.log(err)
        })
    
}


data1()










//------------------- to display data-----------------------

function displaydata(userdata) {
  
    const user = document.getElementById('user').innerHTML = "";

    userdata.forEach((user,index) => {



        const cards = document.createElement('div');
        cards.classList.add("cards");
        
        const card1 = document.createElement('div');
        card1.classList.add("card1");

        cards.appendChild(card1);

        // icon-------------------------------
        const imgicon = document.createElement('i');
        imgicon.classList.add("fa-solid");
        imgicon.classList.add("fa-user");
        imgicon.classList.add("iconuser");

        // id----------------------------------------
        const iddata = document.createElement('div');
        iddata.classList.add("iddata");


        const userid = document.createElement('h3');
        userid.innerText = "Id:";

        const id = document.createElement('h3');
        // id.innerHTML = user.id;

        id.append(index+1)
        iddata.appendChild(userid);
        iddata.appendChild(id)





        // name---------------------------------------
        const namedata = document.createElement('div');
        namedata.classList.add("namedata");

        const firstname = document.createElement('h3');
        firstname.innerText = "Firstname:";

        const fname = document.createElement('h3');
        fname.innerHTML = user.firstName;
        namedata.appendChild(firstname);
        namedata.appendChild(fname);





        // age----------------------------------------
        const agedata = document.createElement('div');
        agedata.classList.add("agedata");
        const age = document.createElement('h3');
        age.innerText = "Age:";

        const ag = document.createElement('h3');
        ag.innerHTML = user.age;
        agedata.appendChild(age);
        agedata.appendChild(ag);






        // phone--------------------------------------
        const phonedata = document.createElement('div');
        phonedata.classList.add("phonedata");

        const phone = document.createElement('h3');
        phone.innerText = "Phone:";

        const ph = document.createElement('h3');
        ph.innerHTML = user.phone;
        phonedata.appendChild(phone);

        phonedata.appendChild(ph)


        // buttons--------------------------------------
        const update = document.createElement('button');
        update.classList.add('upd');

        update.innerText = "UpdateData";
        update.onclick=()=>{
            singleuser(user.id);
            openclosemodal('updatemodal');
        }


        const Delete = document.createElement('button');
        Delete.classList.add('del');
        Delete.innerText = "Delete data";
        Delete.addEventListener("click",()=>{
            deletedata(user.id);
        });





        card1.appendChild(imgicon);
        card1.appendChild(iddata);
        card1.appendChild(namedata);
        card1.appendChild(agedata);
        card1.appendChild(phonedata);
        card1.appendChild(update);
        card1.appendChild(Delete);


        document.getElementById('user').appendChild(cards);
    });

}












//----------------to delete data --------------------------------

function deletedata(id) {
    let confirmbox=window.confirm("Are you want to delete this user?");
    if(confirmbox){
  
    const url = `http://127.0.0.1:8000/users?id=${id}`;
  
    fetch(url, {
        method: "DELETE",
    })
    .then((response) => {
            return response.json(); 
    })
    .then((data) => {
    
     data1();
     document.getElementById("toastmsg").innerText=data;
  
    document.getElementById("toastmsg").style.right="0%";
    setTimeout(()=>{
    document.getElementById("toastmsg").style.right="-25%";
  
    },3000)
  
  
    })
    .catch((err) => {
        console.log("Error:", err);
    });
  }
}  













// .form>input{
//     padding: 10px;
    
//     outline: none;
//     width: 43%;
// }
let modalstatus=false;

function openclosemodal(eleID){

    if(modalstatus===false){
        let modal=document.getElementById(eleID)
        // console.log(modal)
        modal.style.display="flex";
        modalstatus=true;
    }
    else{
        let modal=document.getElementById(eleID)
        // console.log(modal)
        modal.style.display="none";
        modalstatus=false;
    }
   
}





//---------------------to add user---------------------
let users={
    id:null,
    firstName:null,
    age:null,
    phone:null
}

function readValue(property,value){
if(value!==''){
    users[property]=value;
}
else{
    users[property]=null;
}
}





function adduser(){
    const url = "http://127.0.0.1:8000/users";
    fetch(url,{
        method:"POST",
        body:JSON.stringify(users),
        // headers:{
        //     "Content-type":"application/json"
        // },
    })
    .then((response)=>{
        return response.json();

    })
    .then((data)=>{
        data1();
        document.getElementById("toastmsg").innerText = data;
        document.getElementById("toastmsg").style.right = "0%";
     
        setTimeout(() => {
           document.getElementById("toastmsg").style.right = "-25%";
        }, 3000);
     
           document.getElementById('myform').reset();
     
      
    })
    .catch((err) => {
        console.log("Error:", err);
    });
}






//---------------------to update user-------------------


function singleuser(id){

    fetch(`http://127.0.0.1:8000/users?id=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((user)=>{
       document.getElementById('userid').value=user.id;
       document.getElementById('firstname').value=user.firstName;
       document.getElementById('age').value=user.age;
       document.getElementById('phone').value=user.phone;
    })
    .catch((err)=>{
        console.log(err);
    })
}





function updateuser(){
    let userObj={
        id:null,
        firstName:null,
        age:null,
        phone:null
    }

    userObj.id=Number(document.getElementById('userid').value);
    userObj.firstName= document.getElementById('firstname').value;
    userObj.age= Number(document.getElementById('age').value);
    userObj.phone= document.getElementById('phone').value;

    fetch(`http://127.0.0.1:8000/users?id=${userObj.id}`,{
        method:"PUT",  
        body : JSON.stringify(userObj)
    })
    .then((response)=>{
        return response.json();
    })
    .then((res)=>{
        //console.log(res);
           
        data1();
        document.getElementById("toastmsg").innerText=res;
  
        document.getElementById("toastmsg").style.right="0%";
        setTimeout(()=>{
        document.getElementById("toastmsg").style.right="-25%";
      
        },3000)
   
    })
    .catch((err)=>{
        console.log(err);
    })
}










//--------------single user by id------------

// function Getsingle(id) {

  
//     fetch(`http://127.0.0.1:8000/users?id=${id}`)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
        
//             console.log(data);
//             displaydata(data);
       
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// }