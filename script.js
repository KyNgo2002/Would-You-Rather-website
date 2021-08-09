//Variables
const questions = [
    ["Would you rather have telekinesis (to move things with your mind)?", " Would you rather have telepathy (ability to read minds)?", 0],
    ["Would you rather team up with Iron Man?", "Would you rather team up with Batman?", 1],
    ["Would you rather have the power to go invisible?", "Would you rather have the ability to fly?", 2],
    ["Would you rather lose both arms?", "Would you rather lose both legs?", 3],
    ["Would you rather lose your vision?", "Would you rather lose your sense of smell?", 4],
    ["Would you rather win the lottery?", "Would you rather find true love?", 5],
    ["Would you rather go 5 years into the past?", "Would you rather go 5 years into the future?", 6],
    ["Would you rather be in a coma for 5 years?", "Would you rather go to prison for 5 years? ", 7],
    ["Would you rather be royalty 1000 years ago?", "Would you rather be a normal person today?", 8],
    ["Would you rather have an extra toe?", "Would you rather have a third nipple?", 9],
    ["Would you rather always have a full gas tank?", "Would you rather have a full phone battery?", 10],
    ["Would you rather never have watermelon again?", "Would you rather have watermelon with every meal?", 11],
    ["Would you rather die before your partner?", "Would you rather die after your partner?", 12],
    ["Would you rather get free chips of your choice for a year?", "Would you rather get free candy of your choice for a year?", 13],
    ["Would you rather be alone for life?", "Would you rather be surrounded by very annoying people for life?", 14],
    ["Would you rather spend a year homeless in your current town?", "Would you rather spend 6 months alone in the amazon?", 15],
    ["Would you rather have photographic memory?", "Would you rather have an IQ of 200?", 16],
    ["Would you rather lose the ability to speak?", "Would you rather lose the ability to read?", 17],
    ["Would you rather be beautiful and stupid?", "Would you rather be unattractive and a genius?", 18],
    ["Would you rather eat pizza for a year?", "Would you rather not be able to eat pizzas for 10 years?", 19]
]
var database;
var randomNum = 0;
var numVal1 = 0;
var numVal2 = 0;
var keyVal;
let questionsCopy = questions;



//helper functions
function changeQuestion(){
    randomNum = Math.floor(Math.random() * questionsCopy.length);
    keyVal = questionsCopy[randomNum][2];
    document.getElementById("first").innerHTML = questionsCopy[randomNum][0];
    document.getElementById("second").innerHTML = questionsCopy[randomNum][1];
    get();
}

//Onload
window.onload = function(){
    if(location.pathname == "/playProcessing.html"){
        changeQuestion();
        button3.disabled = true;
    }
}

//Firebase setup
var firebaseConfig = {
    apiKey: "AIzaSyAU4DA68OVu4uXQLOUddtzv1KJEo7H-Yv4",
    authDomain: "would-you-rather-d7904.firebaseapp.com",
    projectId: "would-you-rather-d7904",
    storageBucket: "would-you-rather-d7904.appspot.com",
    messagingSenderId: "795882672180",
    appId: "1:795882672180:web:ea777d7daee0138f5a3a61",
    measurementId: "G-K99GPYHRZ6"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Helper update and get functions
function update(thing){
    (thing == "first" ? numVal1 = numVal1 + 1 : numVal2 = numVal2 + 1);
    var updates = {
        "first": numVal1,
        "second": numVal2
    }
    firebase.database().ref("questions/" + keyVal).update(updates);
}


function get(){
    var fireBaseRef = firebase.database().ref("questions/" + keyVal);
    fireBaseRef.once("value", function(snapshot){
        var data = snapshot.val();
        numVal1 = data["first"];
        numVal2 = data["second"];
    })
}

//logic
const button1 = document.getElementById("first");
const button2 = document.getElementById("second");
const button3 = document.getElementById("next-question-button");

button1.onclick = function(){
    update("first");   
    button1.disabled = true;
    let temp1 = questionsCopy[randomNum][0];
    let temp2 = questionsCopy[randomNum][1];
    document.getElementById("first").innerHTML = temp1 + "<br/>" + "<br/>" + "<br/>" +  (100 * (numVal1/(numVal1+numVal2))).toFixed(2) + "% of people chose this answer";
    document.getElementById("second").innerHTML = temp2 + "<br/>" + "<br/>" + "<br/>" + (100 * (numVal2/(numVal1+numVal2))).toFixed(2) + "% of people chose this answer";
    button2.disabled = true;
    button3.disabled = false;
    
}

button2.onclick = function(){
    update("second");
    button1.disabled = true;
    let temp1 = questionsCopy[randomNum][0];
    let temp2 = questionsCopy[randomNum][1];
    document.getElementById("first").innerHTML = temp1 + "<br/>" + "<br/>" + "<br/>" +  100 * (numVal1/(numVal1+numVal2)).toFixed(2) + "% of people chose this answer";
    document.getElementById("second").innerHTML = temp2 + "<br/>" + "<br/>" + "<br/>" + 100 * (numVal2/(numVal1+numVal2)).toFixed(2) + "% of people chose this answer";
    button2.disabled = true;
    button3.disabled = false;
}

button3.onclick = function(){
    if(questionsCopy.length == 1){
        document.getElementById("next-question-button").innerHTML = "No more questions. Click to send home";
        button3.disabled = false;
        button2.disabled = true;
        button1.disabled = true;
        button3.onclick = function(){
            window.location.replace("index.html");
        }
    }
    else{
        button1.disabled = false;
        button2.disabled = false;
        button3.disabled = true;
        questionsCopy.splice(randomNum,1);
        changeQuestion();
    }   
};










