const socket = io();

let myUsername = '';

// Step 1: Join a room
function joinRoom() {
  const username = document.getElementById('usernameInput').value.trim();
  const room = document.getElementById('roomInput').value.trim();

  if (!username || !room) return alert('Please enter both a name and a room.');

  myUsername = username;

  // Tell the server to put us in this room
  socket.emit('joinRoom', { username, room });

  socket.currentRoom = room; // Store the current room on the client-side socket
  // Switch the UI from join screen to chat screen
  document.getElementById('joinScreen').style.display = 'none';
  document.getElementById('chatScreen').style.display = 'block';
  document.getElementById('roomTitle').textContent = `⚡ Room: ${room}`;
  document.getElementById('userLabel').textContent = `Logged in as: ${username}`;
}

// Step 2: On first connection, load all past messages for this room
socket.on('sync', (state) => {
  state.events.forEach(addEventToUI);
});

// Step 3: Every message (including your own) comes back through this event
// Because the server uses io.to(room).emit, you don't manually add your own messages anymore
socket.on('eventReceived', (event) => {
  addEventToUI(event);
});

// Show a system notice when someone joins
socket.on('userJoined', ({ username }) => {
  addSystemMessage(`${username} joined the room`);
});

//say hello to the clinet when they connect
socket.on('connect',()=>{
  addSystemMessage('Welcome to the chat!' );
});

// Show a system notice when someone leaves
socket.on('userLeft', ({ username }) => {
  addSystemMessage(`${username} left the room`);
});

// Send a new message
function sendEvent() {
  const input = document.getElementById('eventInput');
  const text = input.value.trim();
  if (!text) return;

  const event = {
    text: text,
    time: new Date().toLocaleTimeString(),
    username: myUsername   // Attach sender name to the event
  };

  // Just send to server — your own message will come back via eventReceived
  socket.emit('newEvent', event);
  input.value = '';
}

// Step 4: Leave the current room
function leaveRoom() {
  if (!myUsername || !socket.currentRoom) return; // Ensure user is in a room

  socket.emit('leaveRoom');

  // Reset UI
  document.getElementById('chatScreen').style.display = 'none';
  document.getElementById('joinScreen').style.display = 'block';
  document.getElementById('eventList').innerHTML = '';
  document.getElementById('usernameInput').value = ''; // Clear username input
  document.getElementById('roomInput').value = '';     // Clear room input

  myUsername = ''; // Clear client-side username
  socket.currentRoom = ''; // Clear client-side room (though server handles actual leave)
}

function addEventToUI(event) {
  const li = document.createElement('li');
  li.innerHTML = `<span class="username">${event.username || 'Unknown'}</span>
                  <span class="time">${event.time}</span> 
                  ${event.text}`;
  document.getElementById('eventList').appendChild(li);
  // Auto scroll to latest message
  li.scrollIntoView({ behavior: 'smooth' });
}

function addSystemMessage(text) {
  const li = document.createElement('li');
  li.style.textAlign = 'center';
  li.style.color = '#555';
  li.style.fontSize = '0.8rem';
  li.style.borderLeft = 'none';
  li.textContent = `— ${text} —`;
  document.getElementById('eventList').appendChild(li);
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (document.getElementById('joinScreen').style.display !== 'none') {
      joinRoom();
    } else {
      sendEvent();
    }
  }
});

// Event listener for the "Leave Room" button (assuming an element with id 'leaveRoomButton' exists in index.html)
document.addEventListener('DOMContentLoaded', () => {
  const leaveButton = document.getElementById('leaveRoomButton');
  if (leaveButton) leaveButton.addEventListener('click', leaveRoom);
});