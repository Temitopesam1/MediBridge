# MediBridge Backend Api

## bridging the gap between providers and recipients!!!

This is a comprehensive health care application that aims to make accessibility to healthcare seamless and fosters equal distribution of healthcare products and services with a touch of ultimate user control.
It also easy and stressfree communication between the healthcare provider (doctors) and the healthcare recipients (patients). this two constitutes the majority of the aimed user for the app.

The project in this folder serves as the backend API for the application.

The frontend of the project will be built with React and it will communicate with the backend only while the backend will communicate with the database and perfom the business logic to make the application interactive and responsive.

## Technologies and framework:
The backend is implemented with Nodejs as the major technology with Express as the web application framework.
other technologies that served as dependencies can be found in package.json

## Routes and functions:

'/medibridge/article/:id': a delete request to this route will delete a unique article with id of the article as parameter.
'/medibridge/article/:id': a get request to this route will get a unique article with id of the article as a parameter.
'/medibridge/article/:id': a put request to this route will edit a unique article with id of the article as a parameter.
'/medibridge/article': a get request to this route will get all articles.
'/medibridge/article': a post request to this route will create and save a new article.

'/medibridge/appointment': a post request to this route will create and save a new appointment for users.
'/medibridge/appointment': a get request to this route will get all appointments for users. 
'/medibridge/appointment': a delete request to this route will delete appointments.

?? how to get an apointment for a specific user??

'/medibridge/review': a post request to this route will create a new review.

'/medibridge/history/:id': a post request to this route will create and save a new history for recipients
'/medibridge/histories/:id': a get request to this route will get all history for recipient specified by id.
'/medibridge/history/', historyContoller.postHistory

'/medibridge/user/': a post request to this route will create and save a new user.
'/medibridge/user/:id': a put request to this route will edit a user's information. ???check the route in the index and controller
'/medibridge/user/': a get request to this route will get a user.
'/medibridge/user/': a delete request to this route will delete a user.

'/medibridge/user/image': a post request to this route will save a profile picture for user.
'/medibridge/user/image': a put request to this route will update and save a new profile picture for users.
'/medibridge/user/image/': a get request to this route will get the profile picture of a user.

'/medibridge/login/': a get request to this route will authenticate and log a user in.
'/medibridge/logout/': a ger request to this route will log a user out.

'/medibridge/user/healthgoals': a post request to this route will create and save a new health goal.
'/medibridge/user/healthgoals/:id': a put request to this route will update and save a unique health goal.
'/medibridge/user/healthgoals/:id': a delete request to this route will delete a unique health goal.
