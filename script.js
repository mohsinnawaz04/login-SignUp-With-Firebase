console.log("conected");

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "../firebase/firebaseConfig.js";

var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");

let signUpDiv = document.getElementById("signUp-Div");
let signinDiv = document.getElementById("signin-div");

signUpDiv.style.display = "none";

loginBtn.addEventListener("click", () => {
  signUpDiv.style.display = "none";
  signinDiv.style.display = "block";
});
signupBtn.addEventListener("click", () => {
  signUpDiv.style.display = "block";
  signinDiv.style.display = "none";
});

// Sign Up Functionality

var signUpEmail = document.getElementById("semail");
var signUpPassword = document.getElementById("spassword");
var ConfirmPassword = document.getElementById("Cpassword");
var signUpForm = document.getElementById("signUp");
var signInForm = document.getElementById("login");

signUpForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log("Login");
  let email = signUpEmail.value;
  let pass = signUpPassword.value;
  let cPass = ConfirmPassword.value;
  if (pass !== cPass) {
    alert("Passwords Do not match");
    return;
  }
  createUserWithEmailAndPassword(auth, email, pass)
    .then((response) => {
      signUpEmail.value = "";
      signUpPassword.value = "";
      ConfirmPassword.value = "";
      const userUid = response.user.uid;
      console.log(userUid);
      localStorage.setItem("User", userUid);
    })
    .catch((err) => {
      console.error("error", err);
    });
}

// Sign In Functionality

var loginEmail = document.getElementById("lemail");
var loginPass = document.getElementById("lpassword");

signInForm.addEventListener("submit", loginOnSubmit);

function loginOnSubmit(e) {
  e.preventDefault();
  console.log("success");

  let email = loginEmail.value;
  let pass = loginPass.value;

  signInWithEmailAndPassword(auth, email, pass)
    .then((response) => {
      const user = response.user;
      localStorage.setItem("UserLoggedIn", user.uid);
      console.log("success");
      console.log(user);
      redirect();
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

function redirect() {
  if (localStorage.getItem("UserLoggedIn")) {
    window.location.href = "./WelcomePage/welcome.html";
  } else {
    console.log("Failed to provide correct details");
  }
}

(function () {
  if (localStorage.getItem("User")) {
    window.location.href = "./WelcomePage/welcome.html";
  }
})();
