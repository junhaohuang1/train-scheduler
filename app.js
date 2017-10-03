// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFMo-hCJP8qd6m9Q9KaStuKhJ6HVfbQyQ",
    authDomain: "rock-paper-scissors-multiplaye.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-multiplaye.firebaseio.com",
    projectId: "rock-paper-scissors-multiplaye",
    storageBucket: "rock-paper-scissors-multiplaye.appspot.com",
    messagingSenderId: "34941662766"
};

firebase.initializeApp(config);

var name;
var destination;
var firstTrainTime;
var frequency;
var database = firebase.database();
var minutesAway;
var minutesRemaining;
var nextTrainTime;



database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 
    frequency = childSnapshot.val().frequency;
    firstTrainTime = moment(childSnapshot.val().firstTrainTime, "HH:mm");
    var currentTime = moment().format("HH:mm"); 
    currentTime = moment(currentTime, "HH:mm"); 
    var minutesWaited = currentTime.diff(firstTrainTime, "minutes")%frequency;
    minutesRemaining = frequency - minutesWaited; 
    nextTrainTime = currentTime.add(minutesRemaining, "m");
    nextTrainTime=nextTrainTime.format("HH:mm");


    



    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(nextTrainTime);

    

    var row = $("<tr>");
    var cell_1 = $("<td>");
    var cell_2 = $("<td>");
    var cell_3 = $("<td>");
    var cell_4 = $("<td>");
    var cell_5 = $("<td>");

    //Add the column values.
    cell_1.text(childSnapshot.val().name);
    cell_2.text(childSnapshot.val().destination);
    cell_3.text(childSnapshot.val().frequency);
    cell_4.text(nextTrainTime);
    cell_5.text(minutesRemaining);



    row.append(cell_1);
    row.append(cell_2);
    row.append(cell_3);
    row.append(cell_4);
    row.append(cell_5);

    // ID of the table goes here.
    $("#train-table").append(row);


}, function(errorObject) {
    console.log("The read failed:" + errorObject.code);
});




// on click do onSubmit()
$("#submit").on("click", function(event) {

    //nice to have - check if any fields are empty and dont let them submit if there is. 

    event.preventDefault();

    //get the value in each of the text boxes 
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    // push to database 
    database.ref().push({
        "name": name,
        "destination": destination,
        "firstTrainTime": firstTrainTime,
        "frequency": frequency,
        "dateAdded": firebase.database.ServerValue.TIMESTAMP

    });

    // empty the fields 
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");



});