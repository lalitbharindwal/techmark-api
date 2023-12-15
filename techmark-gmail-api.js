function extractCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

function flow(event){
    const bearer = sessionStorage.getItem("bearer")
    if(bearer == null){
        const authorizationCode = extractCodeFromUrl();
        if (authorizationCode) {
            authenticate_code(authorizationCode, event["clientId"], event["clientSecret"], event["redirect_uri"])
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

function encryptBearer(bearer) {
    sessionStorage.setItem("bearer", btoa(unescape(encodeURIComponent(bearer))))
    console.log("sessionStorage.getItem('bearer')2: ", sessionStorage.getItem("bearer"))
  }
  
  // Function to convert base64 string to JSON object
function decryptBearer(bearer) {
    const decryptedBearer = decodeURIComponent(escape(atob(bearer)));
    return JSON.parse(decryptedBearer);
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
            encryptBearer(data2)
            const token_json = JSON.parse(data2)
            console.log(token_json)
            console.log(token_json.body)
            console.log(token_json["body"])
            console.log(token_json["body"]["access_token"])
            console.log(typeof(token_json["body"]["access_token"]))
    });
}