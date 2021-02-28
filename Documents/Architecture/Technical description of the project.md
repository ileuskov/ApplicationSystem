# General info about the project

# 1. Goal

The goal is to build a web app that allows a student to submit his/her application to the university and get an answer whether he/ she is accepted or rejected per E-mail

# 2. Technologies we are going to use:

Frontend: Javascript, HTML, CSS
Backend: Firebase

# 3. Technical implementation

# Frontend: 1 web app with 3 pages

1. First and default page is an Informational page where a student can read something on how to enroll into the university.
   It will have 2 links: to 2) Registration page and 3) Uni admin view
   No other logical functions

2. Registration page (student page)
   Here a student can fill in his/her data and submit it to the uni (our database)
   Upon successful registration a student becomes an email confirming his/her application

3 Features we need to build here:

1. Web form with a submit button
2. Connect submit of this webform to sending the data to our database
3. Making it possible that a database sends an email to every new registered user
4. Uni admin page

Here will be a simple page that will show all the students who have applied to the university

3 Features we need to build here:

1. Getting a data from the database and showing it on the page
2. Implementing a sorting algorithm for the students. So that the best students are shown first
3. Acceptance feature. Manually accept students or automatically accept 100 (or more) best students
   After accepting, students become an email that they are accepted, other become a rejected email

# Backend: Cloud database (Firebase)
