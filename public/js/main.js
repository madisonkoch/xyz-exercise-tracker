// Format exercise date
const exerciseDates = document.getElementsByClassName('format-date');
var formatDate;

for (var i=0; i < exerciseDates.length; i++ ){
    formatDate = exerciseDates[i].innerHTML;
    formatDate = new Date(formatDate);
    formatDate = formatDate.toISOString().slice(0,10);
    exerciseDates[i].innerHTML = formatDate;
}

// Populate Date Dropdown Selections
const daySelections = document.getElementsByClassName('day-select');
const monthSelections = document.getElementsByClassName('month-select');
const yearSelections = document.getElementsByClassName('year-select');


for (var j=0; j<daySelections.length; j++ ){
    for (var d=1; d<32; d++) {
        var day = '<option value="'+d+'">'+d+'</option>"';
        daySelections[j].insertAdjacentHTML('beforeend',day);
    }
}

for (var k=0; k<monthSelections.length; k++){
    for (var m=1; m<13; m++) {
        var month = '<option value="'+m+'">'+m+'</option>"';
        monthSelections[k].insertAdjacentHTML('beforeend',month);
    }
}

var currentDate = new Date();
var yearLimit = currentDate.getFullYear()-5;

for (var l=0; l<yearSelections.length; l++ ){
    for (var y=2020; y>yearLimit; y--) {
        var year = '<option value="'+y+'">'+y+'</option>"';
        yearSelections[l].insertAdjacentHTML('beforeend',year);
    }
}


// Fill Update Exercise form with chosen exercise log info
function updateExercise( exerciseID ) {
    var exerciseName = document.getElementById('log-name-'+exerciseID).innerText;
    var exerciseReps = document.getElementById('log-reps-'+exerciseID).innerText;
    var exerciseWeight = document.getElementById('log-weight-'+exerciseID).innerText;
    var exerciseUnit = document.getElementById('log-unit-'+exerciseID).innerText;
    var exerciseDate = new Date(document.getElementById('log-date-'+exerciseID).innerText);

    document.getElementById('update-id-input').value = exerciseID;

    document.getElementById('update-name-input').value = exerciseName;
    document.getElementById('update-reps-input').value = exerciseReps;
    document.getElementById('update-weight-input').value = exerciseWeight;
    document.getElementById('update-unit-input').value = exerciseUnit;

    document.getElementById('update-month-input').value = exerciseDate.getMonth() + 1;
    document.getElementById('update-day-input').value = exerciseDate.getDate() + 1;
    document.getElementById('update-year-input').value = exerciseDate.getFullYear();

}

// Fill Delete Exercise hidden form with id number
function deleteExercise( exerciseID ) {
    document.getElementById('delete-id-input').value = exerciseID;

    // Trigger form submission
    document.getElementById("delete-form").submit();
}