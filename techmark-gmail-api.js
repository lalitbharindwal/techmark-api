const scope = 'https://mail.google.com/'; // Scopes required by your application
function extractCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }
var authorizationCode = extractCodeFromUrl();
if (authorizationCode) {
    console.log(authorizationCode)
    localStorage.setItem("access-token", authorizationCode)
}
console.log(authorizationCode)
// Function to initiate OAuth flow
function startOAuthFlow(clientId, redirect_uri) {
    authorizationCode = extractCodeFromUrl();
    console.log(localStorage.getItem("access-token"))
    if (authorizationCode) {
        console.log(authorizationCode)
        localStorage.setItem("access-token", authorizationCode)
        return {
            "status": 200,
            "access-token": authorizationCode
        }
    }else if(localStorage.getItem("access-token") == null){
            const authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth';
            const responseType = 'code';

            // Construct the authorization URL
            const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${responseType}&scope=${scope}`;

            // Redirect user to the authorization URL
            window.location.href = authUrl;
    }else{
        return {
                "status": 200,
                "access-token": authorizationCode
            }
        }
    }
