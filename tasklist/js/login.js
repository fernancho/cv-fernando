document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    resetValition();
    let isValid = true;

    if(!email.value.trim() || !isValidEmail(email.value)) {
        setInvalid(email);
        isValid = false;
    }
    if(!password.value.trim()) {
        setInvalid(password);
        isValid = false;
    }
    if(isValid) {
        // Perform login logic here (e.g., send data to server)
        const successMessage = document.querySelector('.success-message');
        successMessage.style.display = 'block';
    }
    //guardar email en local storage
    localStorage.setItem('userEmail', email.value);
    //redireccionar a la pagina de inicio
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000)
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function setInvalid(element) {
        element.classList.add('is-invalid');
    }
    function resetValition() {
        document.querySelectorAll('is-invalid').forEach(element => {
            element.classList.remove('is-invalid');
        });
        document.querySelector('.success-message').style.display = 'none';


}