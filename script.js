const farmerForm = document.getElementById('farmerForm');

farmerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const acreage = parseFloat(document.getElementById('acreage').value);

    // Create an object to hold the data
    const formData = {
        name,
        address,
        telephone,
        email,
        acreage
    };

    // Send the data to the backend
    sendDataToServer(formData);

    // Clear form fields after submission
    farmerForm.reset();
});

function sendDataToServer(data) {
    // Replace the URL below with the URL of your backend server
    const apiUrl = 'https://glittery-kringle-a64027.netlify.app/api/submit-data';

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            // responseData should contain the response from the server
            // In this case, it can be a success message or any other information
            console.log(responseData);

            // Send confirmation email to the user
            sendConfirmationEmail(data.email);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendConfirmationEmail(userEmail) {
    // Replace the URL below with the URL of your backend server's email sending endpoint
    const emailApiUrl = 'https://glittery-kringle-a64027.netlify.app/api/send-email';

    const emailData = {
        to: userEmail,
        subject: 'Confirmation Email',
        body: 'Thank you for submitting your data. We have received the following information:\n\n' +
            'Name: ' + name + '\n' +
            'Address: ' + address + '\n' +
            'Mobile Telephone Number: ' + telephone + '\n' +
            'Size of Bamboo Land (acreage): ' + acreage
    };

    fetch(emailApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        })
        .then(response => response.json())
        .then(responseData => {
            // responseData should contain the response from the server
            // In this case, it can be a success message or any other information
            console.log(responseData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}