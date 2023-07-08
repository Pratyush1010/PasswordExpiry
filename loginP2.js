// Function to handle form submission
function login(event) {
    event.preventDefault();
  
    // Get form values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Send login request via API call (replace with your API endpoint)
    var apiUrl = 'https://your-api-endpoint.com/login';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to login. Please try again.');
      }
    })
    .then(function(data) {
      var isPasswordExpired = data.isPasswordExpired;
      var isHardBlock = data.isHardBlock;
      var expireInDays = data.expireInDays;
      var passwordVerification = data.passwordVerification;
  
      if (isPasswordExpired) {
        if (isHardBlock) {
          alert('Your account is hard blocked. Please contact support for assistance.');
        } else {
          if (expireInDays !== -1 && passwordVerification === 'passed') {
            var message = 'Your password is going to expire in ' + expireInDays + ' days.';
            var resetButton = '<button onclick="resetPassword()">Reset Password</button>';
            var popupContent = message + '<br><br>' + resetButton;
            displayPopup(popupContent);
          } else {
            window.location.href = 'reset-password.html'; // Redirect to reset password page
          }
        }
      } else {
        // Handle successful login
        alert('Login successful!');
        // Perform any additional actions for a successful login
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred during login. Please try again.');
    });
  }
  
  // Function to display a popup with the given content
  function displayPopup(content) {
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = content;
  
    document.body.appendChild(popup);
  }
  
  // Function to handle password reset button click
  function resetPassword() {
    // Redirect to reset password page
    window.location.href = 'reset-password.html';
  }
  
  // Add form submission event listener
  document.getElementById('loginForm').addEventListener('submit', login);
  