import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "../firebase/firebaseConfig.js";

// Forgot Password Functionality

var forgotPassForm = document.getElementById("forgotPassword");
let forgottenEmail = document.getElementById("forgottenEmail");

forgotPassForm.addEventListener("submit", forgotPass);

function forgotPass(e) {
  e.preventDefault();
  let email = forgottenEmail.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      console.error("ERROR$$:", error);
      // ..
    });
}
