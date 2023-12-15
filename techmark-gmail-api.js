function extractCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

function flow(event){
    const bearer = sessionStorage.getItem("bearer")
    if(bearer == null){
        const authorizationCode = extractCodeFromUrl();
        if (authorizationCode) {
            const bearer = authenticate_code(authorizationCode, event["clientId"], event["clientSecret"], event["redirect_uri"])
            console.log("bearer", bearer)
            sessionStorage.setItem("bearer", bearer)
        }else{
            startOAuthFlow(event["clientId"], event["clientSecret"], event["redirect_uri"])
        }
    }
}

// Function to initiate OAuth flow
function startOAuthFlow(clientId, clientSecret, redirect_uri) {
    const authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth';
    const scope = 'https://mail.google.com/'; // Scopes required by your application
    const responseType = 'code';
    // Construct the authorization URL
    const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${responseType}&scope=${scope}`;
    // Redirect user to the authorization URL
    window.location.href = authUrl;
}

function jsonToStringAndBack(data) {
    // Check if the input is an object
    if (typeof data === 'object') {
        // Convert object to string
        var jsonString = JSON.stringify(data);
        return jsonString
  
    }else if (typeof data === 'string') {
        // Convert string to JSON object
        var jsonObjectFromString = JSON.parse(data);
        return jsonObjectFromString
    }else {
        return null;
    }
}

function authenticate_code(authCode, clientId, clientSecret, redirect_uri){
    let headers = new Headers();
    headers.append('Origin','https://lalitbharindwal.github.io');
    fetch('https://mr6s4xnd46.execute-api.us-east-1.amazonaws.com/codeoauth/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "client_id": clientId,
            "client_secret": clientSecret,
            "redirect_uri": redirect_uri,
            "code": authCode
        })
        }).then((data)=>{
            return data.text();
        }).then((data2)=>{
            console.log(data2)
            return data2
    });
}

