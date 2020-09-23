# Foodweb

Full Stack Web Application for subscribing to various food plans<br>
Implemented a REST API using Nodejs and ExpressJS with MongoDB.<br>
Implemented Authentication, Authorization, Emailing and Payment methods for smooth user experience<br>

Check-Out : https://foodrestweb.herokuapp.com/ for front-end view and view layout for the website.
You can use the following functionalities on the link:
1)Create a new User Account
2)Change Password
3)Get Email token verification in case you forget the password.
4)Browse through various plans on this link
5)Use payment gateway to pseudo buy various plans.

If you want to access the full content then clone this repository.
Replace package.json with the following file:
{
  "name": "webfood",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^3.0.6",
    "cookie-parser": "^1.4.4",
    "crypto": "^1.0.1",
    "express": "^4.17.1",
    "express-mongo-sanitize": "^1.3.2",
    "express-rate-limit": "^5.0.0",
    "hpp": "^0.2.2",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^3.3.4",
    "mongoose": "^5.7.11",
    "nodemailer": "^6.3.1",
    "pug": "^2.0.4",
    "stripe": "^7.13.0",
    "validator": "^12.0.0"
  },
  "devDependencies": {
    "nodemon": "^1.19.4"
  }
}

Run the following on the command prompt in the same directory:
-> npm start
Server will listen on port localhost:3000
