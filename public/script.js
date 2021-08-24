const socket = io();
socket.emit("joined");
username = document.getElementById("username");

socket.on("joined", () => {
  document.getElementById("chatbox").innerHTML += "<br>A user has joined. ";
});

socket.on("leave", () => {
  console.log(name+" left");
  document.getElementById("chatbox").innerHTML += "<br>A user has left. ";
});

function usernamehandle() {
  username.style.display = "none";
  document.getElementById("submit").style.display = "none";
  socket.emit('welc', username.value);
  document.getElementById("message").style.display = "block";
  document.getElementById("chatbtn").style.display = "block";
}

function checkinput(event) {
  if (event.keyCode == "13") {
    usernamehandle();
  }
}

socket.on('welc', function(user) {
  document.getElementById("chatbox").innerHTML += "<br>Bot🤖: Hello, "+user+". Welcome to the chat!";
});

function sendmsg() {
  socket.emit('chatmsg', username.value, document.getElementById("message").value);
  document.getElementById("message").value = "";
}

function checkmsginput(event) {
  if (event.keyCode == "13") {
    sendmsg();
  }
}

socket.on('chatmsg', function(user, msg) {
  document.getElementById("chatbox").innerHTML += "<br>"+user+": "+msg;
});
