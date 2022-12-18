import { fetchData, setCurrentUser, setCurrentNote,getCurrentUser, getCurrentNote } from "./fetch.js";


const login = document.getElementById("login-page");
const register = document.getElementById("register-Form");
const note = document.getElementById("noteForm");

if (login) login.addEventListener("submit", loginpageFunction);
if (register) register.addEventListener("submit", registerpageFunction);
// if (note) note.addEventListener("submit", notepageFunction);



class User1 {
  constructor(Username1, Password1) {
    this.Username = Username1;
    this.Password = Password1;
  }

  getUsername() {
    return this.Username;
  }
  setUsername(Username) {
    this.Username = Username;
  }
  getPassword() {
    return this.Password;
  }
  setPassword(Password) {
    this.Password = Password;
  }
}

function loginpageFunction(e) {
  e.preventDefault();
  let Username = document.getElementById("Username").value;
  let Password = document.getElementById("Password").value;

  const Userl2 = new User1(Username, Password);
  console.log(Userl2);
  fetchData("/users/login", Userl2, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) => {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  }) 

}


function getUsers() {
  fetch("http://localhost:3000/users/")
   .then((res)=> res.json())
   .then((data) => console.log(data))
   .catch((err)=> console.log(err))
 }


function registerpageFunction(e) {
  e.preventDefault();
  let Firstname2 = document.getElementById("Firstname").value;
  let Lastname2 = document.getElementById("Lastname").value;
  let Username2= document.getElementById("Username").value;
  let Password2= document.getElementById("Password").value;

  class User {
    constructor(Firstname1, Lastname1, Username1, Password1) {
      this.Firstname = Firstname1;
      this.Lastname = Lastname1;
      this.Username = Username1;
      this.Password = Password1;
    }
    getUsername() {
      return this.Username;
    }
    setUsername(Username1) {
      this.Username =Username1 ;
    }
    getPassword() {
      return this.Password;
    }
    setPassword(Password1) {
      this.Password = Password1;
    }
    getFirstname() {
      return this.Firstname;
    }
    setFirstname(Firstname1) {
      this.Firstname =Firstname1 ;
    }
    getLastname() {
      return this.Lastname;
    }
    setLastname(Lastname1) {
      this.Lastname = Lastname1;
    }
  }

  const user1 = new User(Firstname2, Lastname2, Username2, Password2);
  console.log(user1);

  fetchData("/users/register", user1, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })

}

class User2 {
  constructor(note) {
    this.notedescription = note;
  }

  getnotedescription() {
    return this.note;
  }
  setnotedescription(note) {
    this.notedescription = note;
  }
}

let user = getCurrentUser();
const note2=document.getElementById("noteForm");
if(note2) note2.addEventListener('submit',funnote)

function funnote(e)
{
  e.preventDefault()
  
  

  
  let note1=document.getElementById("notedescription").value;
  const user1=new User2(note1);
  console.log(user1);






  user1.userID = user.userID;

    fetchData("/notes/creatingnote", user1 , "POST")

  .then((data) => {

    setCurrentUser(data);

    console.log(data);

   

  })

  .catch((err) =>{

    let p = document.querySelector('.error');

    p.innerHTML = err.message;

  })

  window.location.reload();

}


// const usersBtn=document.getElementById("users-btn");

// if(usersBtn)usersBtn.addEventListener('click',getUsers);




// const notesBtn=document.getElementById("notes-btn");
// if(notesBtn)notesBtn.addEventListener('click',getNotes);


if(user && note2) getNotes();
function getNotes(){
  let note1= document.getElementById("notedescription");
  fetchData("/notes/getnote",user,"POST")
  .then((data) => {
    console.log(data);
 for(let i=0;i<data.length;i++){
 note1.value='\n'+data[i].notedescription
 }

    })
      .catch((err)=>console.log(`Error! ${err}`));

window.location.href="note.html";
 }