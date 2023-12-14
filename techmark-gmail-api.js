const scope = 'https://mail.google.com/'; // Scopes required by your application
function extractCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }
  
const authorizationCode = extractCodeFromUrl();
  if (authorizationCode) {
      console.log(code)
  }

// Function to initiate OAuth flow
function startOAuthFlow(clientId, redirect_uri) {
  const authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth';
  const responseType = 'code';

  // Construct the authorization URL
  const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${responseType}&scope=${scope}`;

  // Redirect user to the authorization URL
  window.location.href = authUrl;
  
}