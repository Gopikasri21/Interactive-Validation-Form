const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const strength = document.getElementById('strength');

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  const error = formControl.querySelector('.error');
  error.textContent = message;
  error.style.display = 'block';
  input.style.borderColor = '#d93025';
}

// Show success (green border)
function showSuccess(input) {
  const formControl = input.parentElement;
  const error = formControl.querySelector('.error');
  error.style.display = 'none';
  input.style.borderColor = '#28a745';
}

// Email validation
function isValidEmail(emailValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

// Password strength check
function checkStrength(passwordValue) {
  let strengthText = '';
  let strengthClass = '';

  if (passwordValue.length < 6) {
    strengthText = 'Weak';
    strengthClass = 'strength-weak';
  } else if (passwordValue.match(/[A-Z]/) && passwordValue.match(/[0-9]/)) {
    strengthText = 'Strong';
    strengthClass = 'strength-strong';
  } else {
    strengthText = 'Medium';
    strengthClass = 'strength-medium';
  }

  strength.textContent = strengthText;
  strength.className = `password-strength ${strengthClass}`;
}

// Real-time password feedback
password.addEventListener('input', () => {
  checkStrength(password.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  if (username.value.trim() === '') {
    showError(username, 'Username is required');
    isValid = false;
  } else {
    showSuccess(username);
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, 'Enter a valid email');
    isValid = false;
  } else {
    showSuccess(email);
  }

  if (password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters');
    isValid = false;
  } else {
    showSuccess(password);
  }

  if (confirm.value !== password.value || confirm.value === '') {
    showError(confirm, 'Passwords do not match');
    isValid = false;
  } else {
    showSuccess(confirm);
  }

  if (isValid) {
    alert('Registration successful!');
    form.reset();
    strength.textContent = '';
  }
});
