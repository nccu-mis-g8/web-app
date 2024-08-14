const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

function checkInputs() {
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if(usernameValue && passwordValue) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);