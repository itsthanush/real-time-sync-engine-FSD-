<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .dashboard {
            max-width: 800px;
            margin: 50px auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
        }
        .user-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        button {
            padding: 10px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>Welcome to Dashboard!</h1>
        <div class="user-info">
            <p><strong>Username:</strong> <span id="displayUsername">Loading...</span></p>
            <p><strong>User ID:</strong> <span id="displayUserId">Loading...</span></p>
        </div>
        <button onclick="logout()">Logout</button>
    </div>

    <script>
        // Get user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            document.getElementById('displayUsername').textContent = user.username;
            document.getElementById('displayUserId').textContent = user.id;
        } else {
            window.location.href = 'index.html';
        }
        
        function logout() {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        }
    </script>
</body>
</html>
```

### 3. How to Run

1. **Start XAMPP**: Open XAMPP Control Panel, start **Apache** and **MySQL**
2. **Access the project**: Go to `http://localhost/login_project/`
3. **Test login** with:
   - Username: `john_doe`, Password: `password123`
   - Username: `admin`, Password: `admin123`