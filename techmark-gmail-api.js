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

    let headers = new Headers();
    headers.append('Origin','https://lalitbharindwal.github.io/techmark-api/');
fetch('https://mr6s4xnd46.execute-api.us-east-1.amazonaws.com/codeoauth/', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        "action":"login_user"
    })
    }).then((data)=>{
        return data.text();
    }).then((data2)=>{
        var text_json = JSON.parse(data2);
        console.log(text_json)
    });

}
authenticate_code()
