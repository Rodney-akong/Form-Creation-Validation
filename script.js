// script.js

// 1) Wait until the HTML document is fully loaded before running any code.
// This ensures all elements (form, inputs, feedback div) exist when we query them.
document.addEventListener('DOMContentLoaded', function () {

  // 2) Select the form element by its id and store reference in a constant named `form`.
  const form = document.getElementById('registration-form');

  // 3) Select the feedback container where we will show success/error messages.
  const feedbackDiv = document.getElementById('form-feedback');

  // 4) Add a submit event listener to the form. The anonymous function will run when user clicks the Register button.
  form.addEventListener('submit', function (event) {
    // 5) Prevent the browser's default form submission behavior (which would reload the page).
    event.preventDefault();

    // 6) Clear previous feedback and hide the feedback area until we decide what to show.
    feedbackDiv.style.display = 'none';
    feedbackDiv.textContent = '';
    feedbackDiv.innerHTML = '';

    // 7) Read values from inputs and trim whitespace from both ends.
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // 8) Initialize validation tracking variables:
    // isValid will stay true unless we find an invalid rule.
    // messages will collect text for any validation failures.
    let isValid = true;
    const messages = [];

    // 9) Username validation: must be at least 3 characters.
    if (username.length < 3) {
      isValid = false;
      messages.push('Username must be at least 3 characters long.');
    }

    // 10) Email validation: check for presence of '@' and '.' characters.
    // This is a simple check per the task requirements (not a full RFC email validation).
    if (!(email.includes('@') && email.includes('.'))) {
      isValid = false;
      messages.push('Please enter a valid email address (must include "@" and ".").');
    }

    // 11) Password validation: must be at least 8 characters.
    if (password.length < 8) {
      isValid = false;
      messages.push('Password must be at least 8 characters long.');
    }

    // 12) Make the feedback div visible so the user can see messages.
    feedbackDiv.style.display = 'block';

    // 13) If all validations passed, show success message in green.
    if (isValid) {
      feedbackDiv.textContent = 'Registration successful!';
      feedbackDiv.style.color = '#28a745'; // green text
      // Optionally: reset the form after success (uncomment if you want that behavior)
      // form.reset();
    } else {
      // 14) If there are validation errors, join the messages with <br> and display as innerHTML
      // so each message appears on its own line.
      feedbackDiv.innerHTML = messages.join('<br>');
      feedbackDiv.style.color = '#dc3545'; // red text
      // Optionally: focus the first invalid field for better UX
      if (username.length < 3) {
        document.getElementById('username').focus();
      } else if (!(email.includes('@') && email.includes('.'))) {
        document.getElementById('email').focus();
      } else {
        document.getElementById('password').focus();
      }
    }
  }); // end submit listener

}); // end DOMContentLoaded listener
