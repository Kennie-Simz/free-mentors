[![Build Status](https://travis-ci.com/Kmozart/free-mentors.svg?branch=develop)](https://travis-ci.com/Kmozart/free-mentors)  [![Coverage Status](https://coveralls.io/repos/github/Kmozart/free-mentors/badge.svg?branch=develop)](https://coveralls.io/github/Kmozart/free-mentors?branch=develop)

# free-mentors
-------------------------------------------------------------------------------------------------------------------------------------
- Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

Table of Contents
Prerequisites
Tools
Getting Started
Installing the Api
Running Tests
API Endpoints
External Links
Author
## Prerequisites
  Before you clone this repo ensure that you have the following already installed on your machine:

- Visual Studio Code (OR any text editor OR IDE of your choice)
- git
- Node.js
- PostgreSQL

**Ensure to have the following** :


- Dependencies and development dependencies installed with the following commands in your terminal.
``npm install``

``--save -dev (name of a dependency)``

``npm install -D(name for devdependency)``

- Setting up nodemon for automatic re-running this application
nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

``npm install --save-dev nodemon``

- In your package.json file, ensure to include this as part of the script 
```"dev": "nodemon --exec babel-node bin/dev"````

## Tools
### 1.Postman
- Provides a complete API development environment that is flexible and integrates with the software development cycle.

### 2. Pivotal Tracker
- Provides agile project management of choice for developers around the world for real-time collaboration around a shared, prioritized backlog.

### 3. Mocha and Chai
- ***Mocha*** is a javascript testing framework and ***Chai*** is a test assertion library for Javascript.

### 4. Travis CI
- This is a distributed continuous integration service used to build and test software projects hosted at GitHub.

### 5. Coveralls
- Basically does consolidation of any results from a suite of static analysis tools into a single, real-time report, giving you and your team information needed to identify hotspots or threats, evaluate new approaches, and assist in improving quality of code.

### 6. Heroku
- Heroku is a platform as a service (PaaS) that assists developers build, run, and operate applications entirely in the cloud.

### 7. Swagger
- This is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services.

# Getting Started
----------------------------------------------------------------------------------------------------------------------------------------
To clone this repo run the following command:

                        git@github.com:Kmozart/free-mentors.git

## Set up the server
- To install all the required dependencies listed in the package.json file, run the following command in your terminal

                                        npm install
                                        
- Go on to create a .env file, then set up all the environmental variables listed in the .env.sample file.

- To start your server, run the following command on the terminal

                                        npm run dev
                                        
- In order to check and confirm on the tests, ```npm run test``` in the terminal.


*Features*
- Users can sign up

- Login a user

- View mentors

- View specific mentors

- Create a mentorship session request with a mentor

- Change a user to a mentor

- Create a mentorship session request

- Accept a mentorship session request

- Decline a mentorship session request


                                   **API Endpoints**
| **Methods** |         **Endpoints**             |       ***Functionality***                           
--------------|-----------------------------------|---------------------------------------------------|
| POST	      | /api/v1/auth/signup	              |  Creates a new user account                       |
| POST	      | /api/v1/auth/signin             	|  Allows an existing user to sign in               |
| GET         |	/api/v1/user/users   	            |  Gets all users                                   |
| GET	        | /api/v1/mentors	                  |  Get all mentors                                  |
| GET	        | api/v1/mentors/:mentorId	        |  Get a specific mentor                            |
| PATCH       | api/v1/user/:userId               | Admin changes a user to a mentor                  |
| POST        | api/v1/auth/sessions             	|  Create a mentorship session request              |
| PATCH	      | api/v1/sessions/:sessionId/accept	|  A mentor can accept a mentorship session request |
| PATCH     	| api/v1/sessions/:sessionId/reject |	A mentor can reject a mentorship session request  |
|    	        |                                   |                                                   |


External Links
UI Template for the application can be found here on [gh-pages](https://kmozart.github.io/free-mentors/home.html).

Pivotal Tracker Stories can found on [pivotal tracker](https://www.pivotaltracker.com/n/projects/2382912).

Application was deployed to Heroku. Use public URL (#) with API endpoints.

API Documenttion was generated with swagger.

**Author**
Kennedy Simiyu

**Licencing**
Opensource

© 2019 GitHub, Inc.
