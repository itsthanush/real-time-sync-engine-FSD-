git add README.md# ⚡ Real-Time Event Sync Engine

A real-time multi-user chat and event synchronization app built with **Node.js**, **Express**, and **Socket.IO**. Multiple users can join named rooms and send messages that instantly appear for everyone in the same room — live, with no page refresh needed.

---

## 🚀 Features

- 💬 Real-time messaging across all connected users
- 🏠 Named rooms — join any room by name, isolated from other rooms
- 👤 Username support — see who sent each message
- 📜 Message history — new users instantly receive all past messages when they join
- 🔔 Join/leave notifications — see when others enter or exit the room
- ⚡ Instant sync — powered by WebSockets via Socket.IO
- 🎨 Clean dark UI with smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Server Framework | Express 5 |
| Real-Time Engine | Socket.IO 4 |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Dev Tool | Nodemon |

---

## 📁 Project Structure

```
real-time-sync-engine/
├── server/
│   ├── index.js          # Main server — Express + Socket.IO setup
│   └── eventHandler.js   # Handles saving events to shared room state
├── client/
│   ├── index.html        # UI — join screen + chat screen
│   ├── app.js            # Client-side Socket.IO logic
│   └── style.css         # Dark theme styling
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/itsthanush/real-time-sync-engine.git
cd real-time-sync-engine
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the server**
```bash
cd server
node index.js
```

Or use nodemon for auto-restart on file changes (recommended during development):
```bash
cd server
npx nodemon index.js
```

**4. Open in browser**
```
http://localhost:3000
```

---

## 💻 How to Use

1. Open `http://localhost:3000` in your browser
2. Enter your **name** and a **room name** (e.g. `general`)
3. Click **Join**
4. Type a message and press **Send** or hit **Enter**
5. Open the same URL in another tab or device, join the **same room name**, and watch messages sync in real time

> 💡 Use **different room names** to create isolated chat groups — messages in one room won't appear in another.

---

## 📱 Accessing From Another Device (Same WiFi)

You can open the app on your phone or any other device on the same network:

**1. Find your machine's local IP:**
```bash
ipconfig getifaddr en0
```

**2. On the other device, open:**
```
http://YOUR_IP:3000
```

> Make sure your firewall allows incoming connections on port 3000.  
> Go to **System Settings → Privacy & Security → Firewall → Firewall Options** and allow Node.js.

---

## 🔌 How It Works (Architecture)

```
User types message → clicks Send
        ↓
app.js: socket.emit('newEvent', { text, time, username })
        ↓
Server receives event → saves to roomStates[room]
        ↓
Server: io.to(room).emit('eventReceived', event)
        ↓
ALL users in the room receive the event (including sender)
        ↓
Each client's eventReceived handler renders it in the UI
```

### Key Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `joinRoom` | Client → Server | User joins a named room with their username |
| `sync` | Server → Client | Sends full message history to a newly joined user |
| `newEvent` | Client → Server | User sends a new message |
| `eventReceived` | Server → Client | Broadcasts a message to all users in the room |
| `userJoined` | Server → Client | Notifies room when someone joins |
| `userLeft` | Server → Client | Notifies room when someone disconnects |

---

## 🧩 API / Socket Events Reference

### Joining a Room
```js
socket.emit('joinRoom', { username: 'Alice', room: 'general' });
```

### Sending a Message
```js
socket.emit('newEvent', {
  text: 'Hello everyone!',
  time: new Date().toLocaleTimeString(),
  username: 'Alice'
});
```

### Receiving Messages
```js
socket.on('eventReceived', (event) => {
  console.log(`${event.username}: ${event.text}`);
});
```

---

## 🔧 Development

Run with auto-reload using nodemon:
```bash
npm install -g nodemon
cd server
nodemon index.js
```

To change the port, edit this line in `server/index.js`:
```js
server.listen(3000, ...);  // Change 3000 to any port you want
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "socket.io": "^4.8.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| `Cannot find module index.js` | Make sure you `cd server` before running `node index.js` |
| `Cannot GET /` | Check that `app.use(express.static('../client'))` uses `../client` not `client` |
| Other device can't connect | Ensure both are on same WiFi and firewall allows port 3000 |
| Port already in use | Kill the existing process: `lsof -ti:3000 \| xargs kill` |

---
## Preview
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/18734364f98f8cb37f24f7c7292190339f7e4036/Screen%20Shot%202026-02-26%20at%2010.23.30%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/5c3893dc77851ef17831a8947d0c30c27ab944bf/Screen%20Shot%202026-02-26%20at%2010.24.33%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/b7e3eb8d12bd2b51a38f6d6c842e514b7a61c8eb/Screen%20Shot%202026-02-26%20at%2010.24.42%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/57385bbfd67ae98261ab12fbaea1a15feed63202/Screen%20Shot%202026-02-26%20at%2010.25.31%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/0da0317b859c697d82aa1abe3887ce607d3941cb/Screen%20Shot%202026-02-26%20at%2010.26.29%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/2630ffa882057b2971dc78f7003524aeaa64ebc7/Screen%20Shot%202026-02-26%20at%2010.26.38%20PM.png)
![image alt](https://github.com/itsthanush/real-time-sync-engine-FSD-/blob/2f4280b75a97cec9ca5fcc4916c54612a9a1f6eb/Screen%20Shot%202026-02-26%20at%2010.26.47%20PM.png)
## 📄 License

ISC License — feel free to use, modify, and distribute.

---

## 🙌 Author

Built with Node.js + Socket.IO. Contributions and feedback welcome!
