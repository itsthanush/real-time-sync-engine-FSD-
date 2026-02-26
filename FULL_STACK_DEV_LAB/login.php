<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "login_system");

// Check connection
if ($conn->connect_error) {
    die("Connection failed");
}

// Get username and password from form
$username = $_POST['username'];
$password = $_POST['password'];

// Search for user in database
$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

// Check if user exists
if ($result->num_rows > 0) {
    echo "Login Successful";
} else {
    echo "Invalid credentials";
}

$conn->close();
?>