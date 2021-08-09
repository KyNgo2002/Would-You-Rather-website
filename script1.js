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

var database = firebase.database();
var ref = database.ref('submit-questions');

const button4 = document.getElementById('submit-buttons');


button4.onclick = function(){
    let temp1 = document.getElementById('question1').value;
    let temp2 = document.getElementById('question2').value;
    let data = {
        "first": temp1,
        "second": temp2
    }
    ref.push(data);
    alert("Thanks! Your submission will be reviewed! :)")
    document.getElementById('question1').value = '';
    document.getElementById('question2').value = '';

}