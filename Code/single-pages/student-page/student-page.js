
//set max-date of birthday (17 years ago)
{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0
    let yyyy = today.getFullYear() - 17;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("bday").setAttribute("max", today);
}

//Dekleration of Array, that represent the validity of an input variable (valid;error or warning)
{
    var isValid = {
        fname: "error", lname: "error", bday: "error", sex: "error", mail: "error", tel: "warning", street: "error", city: "error", plz: "warning", grade: "warning", cv: "error", letter: "error", certificate: "error"
    };

}



//EventListener for Inputfields
{

    document.getElementById("fname").addEventListener("blur", check_fname);
    document.getElementById("lname").addEventListener("blur", check_lname);
    document.getElementById("bday").addEventListener("blur", check_bday);
    document.getElementById("mail").addEventListener("blur", check_mail);
    document.getElementById("tel").addEventListener("blur", check_tel);
    document.getElementById("street").addEventListener("blur", check_street);
    document.getElementById("city").addEventListener("blur", check_city);
    document.getElementById("plz").addEventListener("blur", check_plz);
    document.getElementById("grade").addEventListener("blur", check_grade);


    document.getElementById("letter").addEventListener("change", check_letter);
    document.getElementById("cv").addEventListener("change", check_cv);
    document.getElementById("certificate").addEventListener("change", check_certificate);
}



/**reaction of a click on the submit button
 *
 * 
 * */
function submit() {
    checkAll();
    let check;

    if (hasError()) {
        setTimeout(function () {
            alert("Mindestens ein benötigtes Feld wurde nicht oder fehlerhaft ausgefüllt. Bitte überprüfen Sie ihre Eingabe!");
        }, 50);
        return;
    }

    else if (hasWarning()) {
        alert("Achtung: Es existiert mindestens eine Warnung! Nach dem Absenden können Sie ihre Eingaben nicht mehr verändern!");
    }


    let doubleCheck = confirm("Achtung: Nach dem Absenden können Sie ihre Eingaben nicht mehr verändern! Möchten Sie wirklich Ihre Daten Absenden?");
    if (doubleCheck == true) {
        send();
        alert("Ihre Daten wurden gesendet. Mit dem Bestätigen dieser Nachricht erhalten Sie ihre Bewerbernummer.")
    }
    else {
        alert("Ihre Daten wurden nicht gesendet");
        return false;
    }

}







//TODO
/**stores the input of all input fields in the database 
 * 
 * */
function send() {

    // Referenzen fuer die Datenbank
    const database = firebase.database();
    const rootRef = database.ref('students')

    //Attribute der Datenbank
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var bday = document.getElementById("bday");
    var gender;
    let mail = document.getElementById("mail");
    let tel = document.getElementById("tel");
    let street = document.getElementById("street");
    let city = document.getElementById("city");
    let plz = document.getElementById("plz");
    let grade = document.getElementById("grade");

    //Bewerbernummer, wird automatisch aufsteigend nach Anzahl der Beworbenen generiert
    var applicantNumber = { value: "Null" };
    var accepted = { value: false };


    // Files
    let file_motivation = document.getElementById("letter").files[0];;
    let file_cv = document.getElementById("cv").files[0];
    let file_diploma = document.getElementById("certificate").files[0];



    //rounds the grade to a number with only one decimal place
    if (eval_grade(grade)) grade = Math.round((grade - 0.05) * 10) / 10;




    let applicant = [fname, lname, bday, gender, mail, tel, street, city, plz, grade, file_motivation, file_cv, file_diploma];



    //TODO Attribute in Datenbank speichern!!!!!

    //Id Erstellen
    const autoId = rootRef.push().key

    // Gender-Check

    if ((document.getElementById("male").checked) == true) {
        gender = document.getElementById("male");
    }
    else if ((document.getElementById("female").checked) == true) {
        gender = document.getElementById("female");
    }
    else if ((document.getElementById("other").checked) == true) {
        gender = document.getElementById("other");

    };

    // Abfrage nach bisherigen Bewerbern zum Erstellen der Bewerbernummer
    // Speichern der Werte in der Datenbank
    rootRef.once("value").then(function (snapshot) {
        number = snapshot.numChildren() + 1;
        applicantNumber.value = number.toString();

        rootRef.child(autoId).set({
            first_name: fname.value,
            last_name: lname.value,
            bDay: bday.value,
            gender: gender.value,
            mail: mail.value,
            telNumber: tel.value,
            street: street.value,
            city: city.value,
            plz: plz.value,
            grade: grade.value,
            applicantNumber: applicantNumber.value,
            accepted: accepted.value
        });

        //Upload der Files in den Storage + Verlinkung in der Datenbank
        uploadFile(applicantNumber, file_motivation, 0);
        uploadFile(applicantNumber, file_cv, 1);
        uploadFile(applicantNumber, file_diploma, 2);

        alert("Ihre Bewerbernummer: " + applicantNumber.value);
    });




};




/**Returns whether a String only contains letters (including " " and äöüß but excluding strings that start with " ")
 *
 * @param string the string that is evaluated
 */
function onlyLetters(string) {

    return /^(?! )[a-z äöüß]+$/i.test(string);
}

/**Returns whether a String or Number fit the format of a phonenumber
 *
 * @param telnum the number or string that is evaluated
 */
function eval_tel(telnum) {
    return /^[0-9]+$/.test(telnum) || (/^[0-9]+$/.test(telnum.substring(1)) && telnum.charAt(0) == "+");
}


/**Returns whether a String matches the requirements for a german zip - code
 *
 * @param plz the string or number to evaluate
 */
function eval_plz(plz) {
    return /^[0-9]+$/.test(plz) && plz.length == 5;
}

/**Returns whether a number is in the range of the grades for the Abitur
 *
 * @param grade the number to be evaluated
 */
function eval_grade(grade) {
    if (!grade.isNaN) {
        return (grade >= 0.6 && grade <= 4);
    }
    return false;
}

/** returns whether a String is accepted as a mail-adress
 *
 * @param mail the string to be evaluated
 */
function eval_mail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
}



/**checks the validity of the input for fname and displays the according warnings
 * */
function check_fname() {
    let temp = document.getElementById("fname").value;
    if (temp.length > 0) {
        if (onlyLetters(temp)) {
            valid("fname");
            return;
        }
        else {
            warning("fname", "Ungewöhnliche Sonderzeichen im Vornamen entdeckt!")
            return;

        }
    }
    error("fname", "Vorname wird benötigt!");
}
/**checks the validity of the input for lname and displays the according warnings
 * */
function check_lname() {
    let temp = document.getElementById("lname").value;
    if (temp.length > 0) {
        if (onlyLetters(temp)) {
            valid("lname");
            return;
        }
        else {
            warning("lname", "Ungewöhnliche Sonderzeichen im Namen entdeckt!")
            return;

        }
    }
    error("lname", "Name wird benötigt!");
}

/**checks the validity of the input for bday and displays the according warnings
 * */
function check_bday() {
    let temp = new Date(document.getElementById("bday").value);
    if (temp.getDate() < 32 && temp.getMonth() < 13 && temp.getFullYear() <= new Date().getFullYear()) {
        valid("bday");
        return;
    }
    error("bday", "Bitte geben Sie ihr Geburtsdatum an!");
}

/**checks the validity of the input for sex and displays the according warnings
 * */
function check_sex() {
    if (document.getElementById("male").checked || document.getElementById("female").checked || document.getElementById("other").checked) {
        valid("sex");
        return;
    }
    error("sex", "Bitte geben Sie ihr Geschlecht an!");

}
/**checks the validity of the input for mail and displays the according warnings
 * */
function check_mail() {
    let temp = document.getElementById("mail").value;
    if (temp.length > 0) {
        if (eval_mail(temp)) {
            valid("mail");
            return;
        }
        else {
            error("mail", "Bitte geben Sie eine gültige E-Mailadresse an!");
            return;
        }
    }
    error("mail", "Bitte geben Sie eine E-Mailadresse an!");


}
/**checks the validity of the input for tel and displays the according warnings
 * */
function check_tel() {
    let temp = document.getElementById("tel").value;
    if (temp.length == 0) {
        warning("tel", "Sie können freiwillig eine Telefonnummer hinterlegen!");
        return;
    }
    else if (!eval_tel(temp)) {
        warning("tel", "Ihre Nummer konnte nicht erkannt werden!");
        return;
    }
    else {
        valid("tel");
    }
}

//TODO Warnung für komische Straßen

/**checks the validity of the input for street and displays the according warnings
 * */
function check_street() {
    let temp = document.getElementById("street").value;
    if (temp.length == 0) {
        error("street", "Bitte geben Sie ihre Adresse an!");
        return;
    }
    else {
        valid("street");
    }
}
/**checks the validity of the input for city and displays the according warnings
 * */
function check_city() {
    let temp = document.getElementById("city").value;
    if (temp.length > 0) {
        if (onlyLetters(temp)) {
            valid("city");
            return;
        }
        else {
            warning("city", "Ungewöhnliche Sonderzeichen im Stadtnamen entdeckt!");
            return;

        }
    }
    error("city", "Bitte geben Sie ihre Adresse an!");
}

//TODO Land einfügen und PLZ anpassen, falls Land nicht Deutschland

/**checks the validity of the input for plz and displays the according warnings
 * */
function check_plz() {
    let temp = document.getElementById("plz").value;
    if (eval_plz(temp)) {
        valid("plz");
        return;
    }
    warning("plz", "Deutsche PLZ wurde nicht erkannt!");
}

//TODO Note für Ausländische Bewerber

/**checks the validity of the input for grade and displays the according warnings
 * */
function check_grade() {
    let temp = document.getElementById("grade").value;
    if (eval_grade(temp)) {
        valid("grade");
        return;
    }
    warning("grade", "Note wurde nicht erkannt!");
}
/**checks the validity of the input for cv and displays the according warnings
*
* */
function check_cv() {
    if (isEmpty("cv")) {
        error("cv", "Bitte laden Sie ihren Lebenslauf als PDF-Datei hoch.");
        return;
    }
    valid("cv");

}
/**checks the validity of the input for letter and displays the according warnings
*
* */
function check_letter() {
    if (isEmpty("letter")) {
        error("letter", "Bitte laden Sie ein Motivationsschreiben als PDF-Datei hoch.");
        return;
    }
    valid("letter");

}
/**checks the validity of the input for certificate and displays the according warnings
*
* */
function check_certificate() {
    if (isEmpty("certificate")) {
        error("certificate", "Bitte laden Sie ihr Abschlusszeugnis als PDF-Datei hoch.");
        return;
    }
    valid("certificate");

}

/**displays an error message a picture next to the according input-field
 *
 * @param input name of the associated input-field (String)
 * @param message String with the error-message, that should be displayed
 */
function error(input, message) {

    let pic = input.concat("_p");
    let msg = input.concat("_m");
    document.getElementById(pic).innerHTML = "<img src='Bilder/Error.png' height='18'>";
    document.getElementById(msg).innerHTML = message;
    isValid[input] = "error";

}


/**displays a warning, including a message and a picture next to the according input-field
*
* @param input name of the associated input-field (String)
* @param message String with the message, that should be displayed
*/
function warning(input, message) {
    let pic = input.concat("_p");
    let msg = input.concat("_m");
    document.getElementById(pic).innerHTML = "<img src='Bilder/Warning.png' height='18'>";
    document.getElementById(msg).innerHTML = message;
    isValid[input] = "warning";

}

/**clears warnings and error-messages next to an input-field
 *
 * @param name name of the associated input-field (String)
 */
function valid(input) {
    let pic = input.concat("_p");
    let msg = input.concat("_m");
    document.getElementById(pic).innerHTML = "";
    document.getElementById(msg).innerHTML = "";
    isValid[input] = "valid";


}


/**checks and validates the input of all input fields 
 * 
 * */
function checkAll() {
    check_fname();
    check_lname();
    check_bday();
    check_sex();
    check_mail();
    check_tel();
    check_street();
    check_city();
    check_plz();
    check_grade();

    check_letter();
    check_cv();
    check_certificate();



}
/**returns whether errors exist for any input field
 * 
 * */
function hasWarning() {
    for (i in isValid) {
        if (isValid[i] == "warning") return true;
    }
    return false;
}

/**returns whether warnings exist for any input field
 * 
 * */
function hasError() {
    for (i in isValid) {
        if (isValid[i] == "error") return true;
    }
    return false;
}


/**returns whether a file was uploaded at an input field
 * 
 * @param file name of the input field, accepting files
 */
function isEmpty(file) {
    if (document.getElementById(file).files.length == 0) {
        return true;
    }
    return false;
};




/* Funktion, fuer den Upload der Dateien. Uebergeben wird 
 
    number: Bewerbernummer (wird bei Anmeldung automatisch generiert)
    file:   Das File, welches hochgeladen werden soll
    sortOfFile: Welche Art von Dokument wird eingereicht.
            Es gilt:
                    0: Motivationsschreiben
                    1: Lebenslauf
                    2: Abiturzeugnis 
*/
function uploadFile(number, file, sortOfFile) {

    // Speichter den Namen des Files
    var file_name = file.name;


    // Bestimmt den Speicherort des Files im Storage und in der Datenbank
    // Erstellt auch den Key fuer die Verlinkung in der Datenbank
    if (sortOfFile == 0) {
        var storageRef = firebase.storage().ref("/motivation/" + file_name);
        var postKey = firebase.database().ref("motivation/").push().key;
    }
    else if (sortOfFile == 1) {
        var storageRef = firebase.storage().ref("/cv/" + file_name);
        var postKey = firebase.database().ref("cv/").push().key;
    }
    else if (sortOfFile == 2) {
        var storageRef = firebase.storage().ref("/diploma/" + file_name);
        var postKey = firebase.database().ref("diploma/").push().key;
    }

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

            if (sortOfFile == 0) {
                updates["/motivation/" + postKey] = postData;
            }
            else if (sortOfFile == 1) {
                updates["/cv/" + postKey] = postData;
            }
            else if (sortOfFile == 2) {
                updates["/diploma/" + postKey] = postData;
            }

            firebase.database().ref().update(updates);
        });



    });
};


/* Ich bin nur zum Testen hier :D

// Referenzen fuer die Datenbank
const database = firebase.database();
const rootRef = database.ref('students')



//Attribute der Datenbank
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var bday = document.getElementById("bday");
var gender;
let mail = document.getElementById("mail");
let tel = document.getElementById("tel");
let street = document.getElementById("street");
let city = document.getElementById("city");
let plz = document.getElementById("plz");
let grade = document.getElementById("grade");

//Bewerbernummer, wird automatisch aufsteigend nach Anzahl der Beworbenen generiert
var applicantNumber = {value: 0};


// Files
let file_motivation;
let file_cv;
let file_diploma;

//Zuweisung der Files
$("#letter").on("change", function(event) {
    file_motivation = event.target.files[0];
   });

$("#cv").on("change", function(event) {
    file_cv = event.target.files[0];
   });

$("#certificate").on("change", function(event) {
    file_diploma = event.target.files[0];
   });


// Event beim Clicken des Submit-Btn
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //Id Erstellen
    const autoId = rootRef.push().key

   // Gender-Check

    if ((document.getElementById("male").checked) == true) {
        gender = document.getElementById("male");
    }
    else if ((document.getElementById("female").checked) == true) {
        gender = document.getElementById("female");
   }
    else if ((document.getElementById("other").checked) == true) {
        gender = document.getElementById("other");

    };

    // Abfrage nach bisherigen Bewerbern zum Erstellen der Bewerbernummer
    // Speichern der Werte in der Datenbank
    rootRef.once("value").then(function(snapshot) {
      applicantNumber.value = snapshot.numChildren() + 1;

    rootRef.child(autoId).set({
        first_name: fname.value,
        last_name: lname.value,
        bDay: bday.value,
        gender: gender.value,
        mail: mail.value,
        telNumber: tel.value,
        street: street.value,
        city: city.value,
        plz:plz.value,
        grade: grade.value,
        applicantNumber: applicantNumber.value
        });

        //Upload der Files in den Storage + Verlinkung in der Datenbank
        uploadFile(applicantNumber, file_motivation, 0);
        uploadFile(applicantNumber, file_cv, 1);
        uploadFile(applicantNumber, file_diploma, 2);

    });

});

*/










