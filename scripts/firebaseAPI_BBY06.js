//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyB0wqFf-E9mbphXcPGNe60L-OQeX6UWlz0",
    authDomain: "local-eco-7eeb3.firebaseapp.com",
    projectId: "local-eco-7eeb3",
    storageBucket: "local-eco-7eeb3.appspot.com",
    messagingSenderId: "119972513374",
    appId: "1:119972513374:web:bf8614fd76978caaa316cf"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();        // Create a new database for us called, "db".