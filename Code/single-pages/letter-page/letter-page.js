const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const updateBtn = document.getElementById('updateBtn');

const database = firebase.database();
const usersRef = database.ref('/students');


let letter;



$("#letter").on("change", function (event) {
    letter = event.target.files[0];
});




updateBtn.addEventListener('click', e => {
    e.preventDefault();

    let applicantNumber = { value: parseInt($("#userId").val()) };
    uploadLFile(applicantNumber, letter);

    alert("Ihr Empfehlungsschreiben für den/die BewerberIn mit der  Nr."
     + applicantNumber.value + " wurde erfolgreich hochgeladen!");


});


// reading data

// alert on students added
usersRef.on('child_added', snapshot => {
    console.log('Student added !');
});

// alert on students updated
usersRef.on('child_changed', snapshot => {
    console.log('Student updated !');
});

// alert on students deteled
usersRef.on('child_removed', snapshot => {
    console.log('Student removed !');
});


//queries

usersRef.orderByKey().limitToLast(2).on('value', snapshot => {
    console.log(snapshot.val());
});

function uploadLFile(number, file) {

    // Speichter den Namen des Files
    var file_name = file.name;


    // Bestimmt den Speicherort des Files im Storage und in der Datenbank
    // Erstellt auch den Key fuer die Verlinkung in der Datenbank

    var storageRef = firebase.storage().ref("/recommendation/" + file_name);
    var postKey = firebase.database().ref("/recommendation/").push().key;


    // Erstellt Variable für den Upload in das Storage
    var uploadTask = storageRef.put(file);


    // Von der Dokumenation kopierte Funktion fuer den Upload

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);


            // Erstellt die Verlinkung in der Datenbank

            var updates = {};
            var postData = {
                url: downloadURL,
                applicantNumber: number.value
            };


            updates["/recommendation/" + postKey] = postData;


            firebase.database().ref().update(updates);
        });



    });
};


