
// Connection to Firebase and all the sub-databases we need
const database = firebase.database();
const usersRef = database.ref('/students');
const cvRef = database.ref('cv');
const diplomaRef = database.ref('/diploma');
const motivationRef = database.ref('/motivation');
const recommendationRef = database.ref('/recommendation');


// Function to handle accepting students by printing their Student Nr.
function acceptStudents() {
    var input = document.getElementById("userInput1").value; // the number is stored here
    alert("BewerberIn mit der Bewerbernummer:   " + input + "   (vorerst) zugelassen!"); // Message for the user

    usersRef.on('value', gotAcceptedData, errAcceptedData); // Making a snapshot of a database

    function gotAcceptedData(data) { // if the conncetion succedeed performing this function

        let students = data.val(); // Saving all our students data into a variable
        const keys = Object.keys(students) // Firebase provides us an object, so we use keys to iterate through them

        for (let i = 0; i < keys.length; i++) { // iterating through all the objects in the Firebase 
            let k = keys[i];
            // And saving all the needed data
            let applicantNumber = students[k].applicantNumber;
            let accepted = { value: true };
            let fname = students[k].first_name;
            let lname = students[k].last_name;
            let bday = students[k].bDay;
            let gender = students[k].gender;
            let mail = students[k].mail;
            let telNumber = students[k].telNumber;
            let street = students[k].street;
            let city = students[k].city;
            let plz = students[k].plz;
            let grade = students[k].grade;



            if (applicantNumber == input) {
                // send update request
                const newData = {
                    accepted: accepted.value,
                    applicantNumber: applicantNumber,
                    first_name: fname,
                    last_name: lname,
                    bDay: bday,
                    gender: gender,
                    mail: mail,
                    telNumber: telNumber,
                    street: street,
                    city: city,
                    plz: plz,
                    grade: grade
                };
                const updates = {};
                updates['/students/' + k] = newData;
                database.ref().update(updates);
            }
        }
    }

    function errAcceptedData(data) { // Handling the errors
        console.log('error!')
    }
};



function rejectStudents() { // function to get the student number that has to be rejected
    var input = document.getElementById("userInput2").value; // the number is stored here
    alert("BewerberIn mit der Bewerbernummer" + input + " (vorerst) abgelehnt!"); // what to do with it? Now it just shows the number

    usersRef.on('value', gotAcceptedData, errAcceptedData); // Making a snapshot of a database

    function gotAcceptedData(data) {

        let students = data.val(); // Saving all our students data into a variable
        const keys = Object.keys(students) // Firebase provides us an object, so we use keys to iterate through them

        for (let i = 0; i < keys.length; i++) { // iterating through all the objects in the Firebase 
            let k = keys[i];
            // And saving all the needed data
            let applicantNumber = students[k].applicantNumber;
            let accepted = { value: false };
            let fname = students[k].first_name;
            let lname = students[k].last_name;
            let bday = students[k].bDay;
            let gender = students[k].gender;
            let mail = students[k].mail;
            let telNumber = students[k].telNumber;
            let street = students[k].street;
            let city = students[k].city;
            let plz = students[k].plz;
            let grade = students[k].grade;

            if (applicantNumber == input) {
                // send update request
                const newData = {
                    accepted: accepted.value,
                    applicantNumber: applicantNumber,
                    first_name: fname,
                    last_name: lname,
                    bDay: bday,
                    gender: gender,
                    mail: mail,
                    telNumber: telNumber,
                    street: street,
                    city: city,
                    plz: plz,
                    grade: grade
                };
                const updates = {};
                updates['/students/' + k] = newData;
                database.ref().update(updates);
            }
        }
    }

    function errAcceptedData(data) { // Handling the errors
        console.log('error!')
    }
};

// reading data from Firebase

let studentsArr = [];
let basicStudentsArr = [];
let extendedStudentsArr = [];
let extendedStudentsArrNames = ["Geburtstag", "Geschlecht", "Straße", "Stadt", "PLZ", "Abiturnote", "Motivationsschreiben", "Lebenslauf", "Abiturzeugnis", "Empfehlungsschreiben"]


usersRef.on('value', gotData, errData); // Making a snapshot of a database

function gotData(data) { // getting data and making a table out of it
    // creating a table

    let students = data.val(); // Saving all our students data into a variable
    const keys = Object.keys(students) // Firebase provides us an object, so we use keys to iterate through them
    //console.log(keys);

    studentsArr=[];
    basicStudentsArr=[];
    extendedStudentsArr=[];
    

    for (let i = 0; i < keys.length; i++) { // iterating through all the objects in the Firebase 
        let k = keys[i];

        // And saving all the needed data
        let applicantNumber = students[k].applicantNumber;
        let first_name = students[k].first_name;
        let last_name = students[k].last_name;
        let bDay = students[k].bDay;
        let gender = students[k].gender;
        let mail = students[k].mail;
        let telNumber = students[k].telNumber;
        let street = students[k].street;
        let city = students[k].city;
        let plz = students[k].plz;
        let grade = students[k].grade;
        let accepted = students[k].accepted
        let motivationArr = [];
        let cvArr = [];
        let diplomaArr = [];
        let recommendationArr = [];

        motivationRef.on('value', gotMotivationData, errData);
        cvRef.on('value', gotCvData, errData);
        diplomaRef.on('value', gotDiplomaData, errData);
        recommendationRef.on('value', gotRecommendationData, errData);

        basicTrValue = [applicantNumber, first_name, last_name, mail, accepted] // List of basic needed data
        expandedTrValues = [bDay, gender, street, city, plz, grade, motivationArr, cvArr, diplomaArr, recommendationArr]; // List of additional needed data
        trValues = [applicantNumber, first_name, last_name, mail, telNumber, bDay, gender, street, city, plz, grade, motivationArr, cvArr, diplomaArr, recommendationArr]; // List of all the needed data


        function gotMotivationData(data) {
            let motivations = data.val(); // Saving all our students data into a variable
            const keys = Object.keys(motivations) // Firebase provides us an object, so we use keys to iterate through them
            console.log(keys);
            for (let j = 0; j < keys.length; j++) {
                let k = keys[j];
                if (applicantNumber == motivations[k].applicantNumber) {
                    let motivation = motivations[k].url;
                    extendedStudentsArr[i][6].push(motivation);
                }
            }
        }


        function gotCvData(data) {
            console.log(data);
            let cvs = data.val(); // Saving all our students data into a variable
            const keys = Object.keys(cvs) // Firebase provides us an object, so we use keys to iterate through them
            console.log(keys);
            for (let j = 0; j < keys.length; j++) {
                let k = keys[j];
                if (applicantNumber == cvs[k].applicantNumber) {
                    let cv = cvs[k].url;
                    extendedStudentsArr[i][7].push(cv);
                }
            }
        }

        function gotDiplomaData(data) {
            let diplomas = data.val(); // Saving all our students data into a variable
            const keys = Object.keys(diplomas) // Firebase provides us an object, so we use keys to iterate through them
            console.log(keys);
            for (let j = 0; j < keys.length; j++) {
                let k = keys[j];
                if (applicantNumber == diplomas[k].applicantNumber) {
                    let diploma = diplomas[k].url;
                    extendedStudentsArr[i][8].push(diploma);
                }
            }
        }

        function gotRecommendationData(data) {
            let recommendations = data.val(); // Saving all our students data into a variable
            const keys = Object.keys(recommendations) // Firebase provides us an object, so we use keys to iterate through them
            console.log(keys);
            for (let j = 0; j < keys.length; j++) {
                let k = keys[j];
                if (applicantNumber == recommendations[k].applicantNumber) {
                    let recommendation = recommendations[k].url;
                    extendedStudentsArr[i][9].push(recommendation);
                }
            }
        }


        studentsArr.push(trValues);
        basicStudentsArr.push(basicTrValue);
        extendedStudentsArr.push(expandedTrValues);


    }

    // creating a table while firebase snapshot still working. After that the data transaction will stop and we won't be able to use any data
    createTable();


    const saveBtn = document.getElementById('saveBtn');
    const sendBtn = document.getElementById('sendBtn');

    // save students data
    saveBtn.addEventListener('click', e => {

    });

    // send  emails to applicants
    sendBtn.addEventListener('click', e => {

    });
};

// function to create a table that is used in our firebase shapshot connection

function createTable() {
    let row = "";
    let index;
    // for loop that goes through all students and lists them into the table
    for (index = 0; index < basicStudentsArr.length; index++) {
        if (index == showDetailsOF) {
            row = row + '<div class="normalRow"> '
        } else {
            row = row + '<div class="underlinedRow"> '
        }
        for (let j = 0; j <= basicStudentsArr[index].length; j++) {
            if (j == basicStudentsArr[index].length) {
                if (basicStudentsArr[index][4] == true) {
                    row = row + '<div class="box-1"><input type="checkbox" value="true" id="' + '" name="' + '" checked disabled></input></div>'
                } else {
                    row = row + '<div class="box-1"><input type="checkbox" value="true" id="' + '" name="' + '"disabled></input></div>'
                }
            } else if (j == 0) {
                row = row + '<div class="box-1 clickable" onclick="showDetails(' + index + ')"><strong><p>' + studentsArr[index][j] + '</p></strong></div>';
            } else {
                row = row + '<div class="box-1"><strong><p>' + studentsArr[index][j] + '</p></strong></div>';
            }
        }
        row = row + '</div>';

        //additional data after clicked on applicantNumber
        if (index == showDetailsOF) {
            for (let l = 0; l < extendedStudentsArrNames.length; l++) {
                if (l % 2 == 0) {
                    if (l < extendedStudentsArrNames.length - 2) {
                        row = row + '<div class="normalRow">'
                    } else {
                        row = row + '<div class="underlinedRow">'
                    }
                }
                if (l < extendedStudentsArrNames.length - 4) {
                    row = row + '<div class="box-1"><h3 class="lightText">' + extendedStudentsArrNames[l] + '</h3></div>'
                    row = row + '<div class="box-1"><strong><p>' + extendedStudentsArr[index][l] + '</p></strong></div>';
                } else {
                    row = row + '<div class="box-1"><h3 class="lightText">' + extendedStudentsArrNames[l] + '</h3></div>'
                    row = row + '<div class="box-1">';
                    for (let m = 0; m < extendedStudentsArr[index][l].length; m++) {
                        row = row + '<a  href="' + extendedStudentsArr[index][l][m] + '" target="_blank"><strong class="clickable"><p>PDF</p></strong></a>';
                    }
                    row = row + '</div>';
                }

                if (l % 2 == 1) {
                    row = row + '</div>'
                }
                if (l == extendedStudentsArrNames.length - 1 & l % 2 == 0)
                    row = row + '<div class="box-2"></div></div>'
            }
        }
    }
    document.querySelector('output').innerHTML = row;
}

let showDetailsOF = -1;

function showDetails(index) {
    if (index == showDetailsOF) {
        showDetailsOF = -1;
        console.log(showDetailsOF);
    } else {
        showDetailsOF = index;
        console.log(showDetailsOF);
    }
    createTable();
}



function errData(data) { // Handling the errors
    console.log('error!')
}


// function sendEmail, which sends encrypted emails via SSL
async function sendEmail() {

    console.log("Hey the function started OK");

    usersRef.on('value', gotMailData, errMailData); // Making a snapshot of a database

    function gotMailData(data) { // getting data and making a table out of it
        // creating a table

        let students = data.val(); // Saving all our students data into a variable
        const keys = Object.keys(students) // Firebase provides us an object, so we use keys to iterate through them
        //console.log(keys);

        for (let i = 0; i < keys.length; i++) { // iterating through all the objects in the Firebase 
            let k = keys[i];

            // And saving all the needed data
            let applicantNumber = students[k].applicantNumber;
            let first_name = students[k].first_name;
            let last_name = students[k].last_name;
            let mail = students[k].mail;
            let accepted = students[k].accepted


            let mailValues = [applicantNumber, first_name, last_name, mail, accepted] // List of basic needed data

            // now we are going through the saved values and check if a student accepted
            for (let j = 0; j < mailValues.length; j++) {
                if (mailValues[4] == true) { // if a student is accepted

                    Email.send({ // then we send him an email
                        SecureToken: "08e6fb35-467a-4f40-8592-428b80646c36",
                        To: mail,
                        From: "webninjasproject@gmail.com",
                        Subject: "Annahme - Bewerbung",
                        Body: "Sehr geehrter/geehrte " + first_name + " " + last_name + ", ihre Bewerbung mit ID " + applicantNumber + " wurde geprüft und zugelassen" + " mit freundlichen Grüßen, Universität zu Köln"
                    }).then(
                        alert("Ein Zulassungsbescheid wurde an den/die BewerberIn mit der Nummer " + applicantNumber + " geschickt.")
                    );
                    break; // break the for loop while we don't need to check anything else here
                }

            }
            
        }
    }

    function errMailData(data) { // Handling the errors
        console.log('error!')
    }
}
