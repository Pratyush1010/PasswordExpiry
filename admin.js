// Function to handle form submission
function savePolicy(event) {
    event.preventDefault();
  
    // Get form values
    var passwordLength = document.getElementById('passwordLength').value;
    var requireUppercase = document.getElementById('requireUppercase').checked;
    var requireLowercase = document.getElementById('requireLowercase').checked;
    var requireNumbers = document.getElementById('requireNumbers').checked;
    var requireSpecialChars = document.getElementById('requireSpecialChars').checked;
    var enableExpiry = document.getElementById('enableExpiry').checked;
    var passwordExpiry = enableExpiry ? document.getElementById('passwordExpiry').value : 0;
    var passwordExpiryNotification = enableExpiry ? document.getElementById('passwordExpiryNotification').value : 0;
  
    // Create policy object
    var policy = {
      passwordLength: parseInt(passwordLength),
      requireUppercase: requireUppercase,
      requireLowercase: requireLowercase,
      requireNumbers: requireNumbers,
      requireSpecialChars: requireSpecialChars,
      passwordExpiry: parseInt(passwordExpiry),
      passwordExpiryNotification: parseInt(passwordExpiryNotification)
    };
  
    // Send policy via API call (replace with your API endpoint)
    var apiUrl = 'https://your-api-endpoint.com/save-policy';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(policy)
    })
    .then(function(response) {
      if (response.ok) {
        alert('Password policy saved successfully!');
        // Reset form after successful submission
        document.getElementById('policyForm').reset();
      } else {
        alert('Failed to save password policy.');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred while saving the password policy.');
    });
  }
  
  // Function to handle expiry checkbox change
  function handleExpiryCheckboxChange() {
    var enableExpiryCheckbox = document.getElementById('enableExpiry');
    var passwordExpiryInput = document.getElementById('passwordExpiry');
    var passwordExpiryNotificationInput = document.getElementById('passwordExpiryNotification');
  
    passwordExpiryInput.disabled = !enableExpiryCheckbox.checked;
    passwordExpiryNotificationInput.disabled = !enableExpiryCheckbox.checked;
  }
  
  // Add form submission event listener
  document.getElementById('policyForm').addEventListener('submit', savePolicy);
  
  // Add expiry checkbox change event listener
  document.getElementById('enableExpiry').addEventListener('change', handleExpiryCheckboxChange);
  