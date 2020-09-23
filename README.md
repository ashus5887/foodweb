# Foodweb

Full Stack Web Application for subscribing to various food plans<br>
Implemented a REST API using Nodejs and ExpressJS with MongoDB.<br>
Implemented Authentication, Authorization, Emailing and Payment methods for smooth user experience<br>
<br><br>
Check-Out : https://foodrestweb.herokuapp.com/ for front-end view and view layout for the website.<br>
You can use the following functionalities on the link:<br>
1)Create a new User Account<br>
2)Change Password<br>
3)Get Email token verification in case you forget the password.<br>
4)Browse through various plans on this link<br>
5)Use payment gateway to pseudo buy various plans.<br>
<br>
If you want to access the full content then clone this repository.<br>
Replace package.json with the following file:<br>
{<br>
  "name": "webfood",<br>
  "version": "1.0.0",<br>
  "description": "",<br>
  "main": "server.js",<br>
  "scripts": {<br>
    "test": "echo \"Error: no test specified\" && exit 1",<br>
    "start": "nodemon server.js"<br>
  },<br>
  "author": "",<br>
  "license": "ISC",<br>
  "dependencies": {<br>
    "bcrypt": "^3.0.6",<br>
    "cookie-parser": "^1.4.4",<br>
    "crypto": "^1.0.1",<br>
    "express": "^4.17.1",<br>
    "express-mongo-sanitize": "^1.3.2",<br>
    "express-rate-limit": "^5.0.0",<br>
    "hpp": "^0.2.2",<br>
    "jsonwebtoken": "^8.5.1",<br>
    "mongodb": "^3.3.4",<br>
    "mongoose": "^5.7.11",<br>
    "nodemailer": "^6.3.1",<br>
    "pug": "^2.0.4",<br>
    "stripe": "^7.13.0",<br>
    "validator": "^12.0.0"<br>
  },<br>
  "devDependencies": {<br>
    "nodemon": "^1.19.4"<br>
  }<br>
}<br>
<br><br>

Enter DB details in userModel.js and planModel.js<br>
Add Stripe sk_key<br>
Run the following on the command prompt in the same directory:<br>
-> npm start<br>
Server will listen on port localhost:3000<br>
