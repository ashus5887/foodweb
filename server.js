const server = require("./api")
var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Server is running at port 3000")
});

// npm star in the terminal 
// C:\Coding\DEV\Lecture8 
// npm start // Live changes willl be reflected and the server will restart automatically 
// node server.js ->>>>this command also works but after every edit we have to restart the node server.js