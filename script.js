  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

  import { getAuth,
            onAuthStateChanged,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut

   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
  import { getFirestore,
    collection, 
    addDoc,
    getDocs,


   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyDry3QU4pb7HO7MeXelGksd_0jeA7LEVlE",
    authDomain: "saylani-1st-firebase.firebaseapp.com",
    projectId: "saylani-1st-firebase",
    storageBucket: "saylani-1st-firebase.appspot.com",
    messagingSenderId: "880835750257",
    appId: "1:880835750257:web:c76ffecb0015d73a62aed0",
    measurementId: "G-DE660F0YQX"
  };

  // Initialize Firebase Auth
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  
  const signup_email = document.getElementById("signup_email");
  const signup_password = document.getElementById("signup_password");
  const signup_btn = document.getElementById("signup_btn");

  const signin_email = document.getElementById("signin_email");
  const signin_password = document.getElementById("signin_password");
  const signin_btn = document.getElementById("signin_btn");

  const user_email = document.getElementById("user_email");
  const logout_btn = document.getElementById("logout_btn");

  



  const auth_container = document.getElementById("auth_container");
  const user_container = document.getElementById("user_container");
  



  signup_btn.addEventListener("click", createaccount)
  signin_btn.addEventListener("click", signin_account)
  logout_btn.addEventListener("click" , sign_out)




onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is loggd in ");
     auth_container.style.display= "none"
     user_container.style.display = "block"
     user_email.innerHTML=user.email
    
  
    const uid = user.uid;
  } else {
     auth_container.style.display= "block"
     user_container.style.display = "none"
    console.log("user is not loggd in ");


  }
});
function createaccount(){
    // console.log("email=>", signup_email.value);
    // console.log("password=>", signup_password.value);
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log( "loggedin", user );
    
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
   alert(error.message);

    // ..
  });


    


}
function signin_account(){
    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
  .then((userCredential) => {

    // Signed in 
    const user = userCredential.user;
    console.log(user);
    console.log("user is logged in ");
    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
  });
}

function sign_out(){
    signOut(auth).then(() => {

        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}


//  starting firestore database 


const db = getFirestore(app);
let todo_collection = collection(db , "todos")

const add_todo = document.getElementById('add_todo');
const submit_todo = document.getElementById('submit_todo');
const todo_list = document.getElementById('todo_list');



submit_todo.addEventListener('click', todo_Created)


async function todo_Created(){

try{
  const obj={
    todo: add_todo.value,
    addedAt: new Date().toString(),
  }
  const addRef= await addDoc(todo_collection , obj);
get_Data()

  console.log(addRef);
  
}catch(e){
 console.log(e)
}
}

get_Data()
// getting data from firestore 
async function get_Data (){
  try{
    const getting_todo = await getDocs (todo_collection )

    getting_todo.forEach((doc)=> {
      console.log( "user ID" ,doc.id);
      console.log("user DAta==>", doc.data);

const {todo , addedAt}= doc.data();

const ele= `<li  id= ${doc.id}> ${todo} ${new Date(addedAt).toLocaleTimeString()}</li>`
todo_list.innerHTML += ele;
      
    })

  }catch(e){
      console.log(e);
      
  }

}



const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});







