const scope = 'https://mail.google.com/'; // Scopes required by your application
function extractCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

// Function to initiate OAuth flow
function startOAuthFlow(clientId, redirect_uri) {
    const authorizationCode = extractCodeFromUrl();
    if (authorizationCode) {
        return {
            "status": 200,
            "code": authorizationCode
        }
    }else{
        const authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth';
        const responseType = 'code';
        // Construct the authorization URL
        const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${responseType}&scope=${scope}`;
        // Redirect user to the authorization URL
        window.location.href = authUrl;
    }
}

function authenticate_code(){

    // URL to fetch data from
const apiUrl = 'https://mr6s4xnd46.execute-api.us-east-1.amazonaws.com/codeoauth/';

// Using Fetch to make a GET request
fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON data returned by the server
    return response.json();
  })
  .then(data => {
    // Work with the data obtained from the server
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
}
authenticate_code()
