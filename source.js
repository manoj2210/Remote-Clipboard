const clipboardy = require('clipboardy');

const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyB3w10LmK9CyFucirOsOaSbpRjy0qy0_1Y",
    authDomain: "clip-board-25e39.firebaseapp.com",
    projectId: "clip-board-25e39",
    storageBucket: "clip-board-25e39.appspot.com",
    messagingSenderId: "538191074498",
    appId: "1:538191074498:web:251fdd1fe16d1d90f8175b",
    measurementId: "G-XJ0YNTFX8T"
};

firebase.initializeApp(firebaseConfig);

const database=firebase.firestore();

const clipBoardRef = database.collection('clipboard');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question(`What's your email Id ? \n`, (id) => {
    clipBoardRef
        .doc(id)
        .set({text: "test",})
        .then(() => {
            setInterval(async ()=>{
                let val=await clipboardy.readSync().toString();
                const userRef= clipBoardRef.doc(id);
                userRef
                    .update({
                        text: val,
                    })
                    .then(() => {
                        // console.log("Document updated");
                    })
                    .catch((error) => {
                        console.error("Error updating doc", error);
                    });
            },1000);
        })
        .catch(e=>{console.log(e)});
});