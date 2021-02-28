# -english version below-

# **_WebNinjas Web APP_**

## Einführung

In diesem Projekt wurde eine Software für die Verwaltung des Zulassungsverfahrens des neuen Studiengangs
Informatik an der Universität zu Köln entwickelt.
Die Software bietet Bewerbern die Möglichkeit, ihre Unterlagen für die Bewerbung einzureichen. Außerdem können Dritte Empfehlungsschreiben für einen Bewerber hinzufügen.  
Die Zulassungskommission kann mit Hilfe der Software eingehende Bewerbungen verwalten und auswerten. Desweiteren gibt es die Möglichkeit, alle zugelassenen Bewerber über ihre Zulassung per Mail zu informieren.

---

## Struktur

Das Frontend der Software besteht aus einer Webapplikation mit vier Webseiten, geschrieben in HTML, CSS und JavaScript. Eine Datenbank im Backend, basierend auf der Firebase Plattform, verwaltet alle eingegebenen Daten.

### 1. Startseite

Über die Startseite sind alle weiteren Seiten erreichbar.
Universitätsangehörige können über die Admin-Login-Funktion auf die Verwaltung des Zulassungsverfahrens zugreifen.
Bewerber gelangen über die Startseite zum Bewerbungsformular.
Eine Seite auf der Empfehlungsschreiben hochgeladen werden können ist ebenfalls verlinkt.
Außerdem sind auf der Startseite wichtige Informationen zum Bewerbungsverfahren und ein Link zur Universitätswebsite.

### 2. Admin-Seite

Diese Seite dient zur Verwaltung des Zulassungsverfahrens.
Aktuell gibt es noch keine Login-Möglichkeit. Dies ist aber in Zukunft angedacht.
Von hier aus kann das Universitätspersonal die Daten der Bewerber aus der Datenbank einsehen und Bewerber zum Studiengang zulassen.
Das Einsehen der Daten geschieht durchs Klicken auf die Studenten-ID des Bewerbers.
Die hochgeladenen PDF Dateien des Bewerbers können direkt gedownloadet werden indem man auf die PDF Links klickt.
Über einen Button können Zulassungs-E-Mails an alle angenommenen Bewerber versendet werden.

### 3. Formular für Empfehlungsschreiben

Dritte können auf dieser Seite Empfehlungsschreiben einreichen, indem sie das Formular ausfüllen und anschließend "Senden".
Hier wird die in der Bewerbung generierte Studenten-ID zur eindeutigen Identifikation des Studenten benötigt.

### 4. Bewerbungsformular

Über dieses Bewerbungsformular kann ein Bewerber benötigte Daten angeben und an die Universität übermitteln.
Das Formular kann nur abgeschickt werden, wenn alle benötigten Daten im korekten Format angegeben wurden.
Wurde das Formular abgeschickt, werden die Daten in die Datenbank übertragen und der Bewerber erhält eine Studenten-ID, die für das Einreichen von Empfehlungsschreiben benötigt wird.
Mit der Studenten-ID bietet sich die Möglichkeit, dass Dritte Personen ein Empfehlungsschreiben für den Bewerber hochladen kann.

---

## **Anforderungen**

    -Browser
    -Internetverbindung
    -Texteditor (zum Bearbeiten von Admin-Funktionen)

---

## **Verwendung**

### Installation

### Verwaltung

**Verwendung eines anderen smtp-Mailservers**

1.  Gehen Sie auf [SMTPJS](https://smtpjs.com/)
1.  Scrollen Sie zum Bereich "Sicherheit" und klicken Sie auf "Encrypt your SMTP Credentials".
1.  Geben Sie Ihre SMTP-Zugangsdaten ein und klicken Sie auf "Generate security token".
1.  Kopieren Sie Ihren Sicherheits-Token und ersetzen Sie den alten Token in der sendEmail()-Funktionen unter "SecureToken":

    - Code/Einzelseiten/Admin-Seite/Admin-Seite.js

    - Code/Einzelseiten/Schülerseite/Schülermail.js

**E-Mail für akzeptierte Bewerber bearbeiten**

1. Öffnen Sie: `Code/single-pages/admin-page/admin-page.js`
1. Ändern Sie den Text nach "Body:" in der Funktion sendEmail().

**E-Mail zur Registrierung von Antragstellern bearbeiten**

1. Öffnen Sie: `Code/einzelne Seiten/Studentenseite/Studentenmail.js`
1. Ändern Sie den Text nach "Body:" in der Funktion sendEmail().

---

## Mitwirkende

Team 14 - WebNinjas (@Lars, @Ivan, @Karsten, @Jonas, @Sebastian, @Jan)

---

---

# -english version-

# **_WebNinjas Web APP_**

## Introduction

In this project a software for the administration of the admission procedure of the new course of studies
in Computer Science at the University of Cologne was developed.  
This software offers applicants the possibility to submit their documents for the application.  
With the help of the software, the admissions committee can also manage and evaluate incoming applications.  
The application can also be used by external third parties to add letters of recommendation for an applicant.

---

## Structure

The structure of the website consists of a web app with 3 webpages in the Frontend, written in HTML, CSS and JavaScript, and a database in the Backend, based on the Firebase platform.

### 1. Landing page

On the default page, applicants will find general information about the application process and external third parties can find information for submitting letters of recommendation.  
University employees can access the administration of the admission process via the admin login function.

### 2. Admin page

Here will be a simple page that will show all the students who have applied to the university.  
From here, the university staff can see and save the applicants' data from the database and send admission e-mails to accepted students.

### 3. Letter page

Third parties can submit letters of recommendation on this page by filling out a form.

### 4. Student page

Here a student can fill in his/her data and submit it to the university.  
The input of the completed form is stored in the database.  
An email with the StudentId is sent to the applicant by the university.

---

## **Requirements**

    -internet connection
    -browser
    -text editor (for admin-functions)

---

## **Usage**

### Adminisration

**-> use different smtp mailserver**

&nbsp; 1. go on [SMTPJS](https://smtpjs.com/)

&nbsp; 2. scroll down to security and click on "Encrypt your SMTP Credentials"

&nbsp; 3. insert your SMTP credentials and click on "Generate security token"

&nbsp; 4. copy your security token and update it in VSCode in our sendEmail() functions in under "SecureToken":

      - Code/single-pages/admin-page/admin-page.js

      - Code/single-pages/student-page/studentmail.js

> we know its not very usable, but this should only be a mvp! - we're sorry ( ´･･)ﾉ(.\_.`)

**-> edit email for accepted applicants**

&nbsp; 1. open in VSCode: `Code/single-pages/admin-page/admin-page.js`

&nbsp; 2. change text after "Body:" in sendEmail() function.

**-> edit email for registration of applicants**

&nbsp; 1. open in VSCode: `Code/single-pages/student-page/studentmail.js`

&nbsp; 2. change text after "Body:" in sendEmail() function.

---

## Contributors

Team 14 - WebNinjas (@Lars, @Ivan, @Karsten, @Jonas, @Sebastian, @Jan)
