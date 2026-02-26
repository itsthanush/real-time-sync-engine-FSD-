// Your validation function
function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userError = document.getElementById("userError");
    let passError = document.getElementById("passError");
    
    userError.innerHTML = "";
    passError.innerHTML = "";
    
    let valid = true;
    
    if (username === "") {
        userError.innerHTML = "Username is required";
        valid = false;
    }
    
    if (password === "") {
        passError.innerHTML = "Password is required";
        valid = false;
    }
    
    return valid;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // First, validate the form
    if (!validateForm()) {
        return false;
    }
    
    // If validation passes, send data to PHP
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        let messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        
        if (data.includes('Successful')) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Login Successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 1500);
        } else {
            messageDiv.className = 'message fail';
            messageDiv.textContent = 'Invalid username or password!';
        }
    })
    .catch(error => {
        let messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        messageDiv.className = 'message fail';
        messageDiv.textContent = 'Error connecting to server!';
    });
    
    return false;
}