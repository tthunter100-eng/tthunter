// Handle "Continue as Guest" button click
document.getElementById('continueGuestBtn').addEventListener('click', function() {
    window.location.href = '../User Interface/index.html';
});

// Handle Login button click
document.getElementById('loginBtn').addEventListener('click', function() {
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');
    const username = usernameInput.value;
    const password = passwordInput.value;
    const errorMessage = document.getElementById('errorMessage');

    // Hide any previous error message
    errorMessage.style.display = 'none';

    // Basic validation
    if (!username && !password) {
        errorMessage.textContent = 'Please input a username and password';
        errorMessage.style.display = 'block';
        return;
    } else if (!username) {
        errorMessage.textContent = 'Please input a username';
        errorMessage.style.display = 'block';
        return;
    } else if (!password) {
        errorMessage.textContent = 'Please input a password';
        errorMessage.style.display = 'block';
        return;
    }

    // Check if username and password are "admin"
    if (username === 'admin' && password === 'admin') {
        window.location.href = '../Admin Interface/adminindex.html';
    } else {
        errorMessage.textContent = 'Username or password incorrect';
        errorMessage.style.display = 'block';
    }
});
