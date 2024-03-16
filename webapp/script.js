document.addEventListener('DOMContentLoaded', function() {
    var auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

    auth.initialize({
        signInRedirectURL: "http://127.0.0.1:5501/index.html",
        signOutRedirectURL: "http://127.0.0.1:5501/index.html",
        clientID: "qJP8fuaU4JWsKGWX2Z66oOYlh7wa",
        baseUrl: "https://api.asgardeo.io/t/purplewave",
        scope: [ "openid","profile"]
    });

    let signinbtn = document.getElementById("button");
    let logtoken = document.getElementById("logtoken");
    let logout = document.getElementById("logout");
    
    //auth.signIn();

    signinbtn.addEventListener("click", function(ev){
        auth.signIn();
    });
    logout.addEventListener("click", function(ev){
        auth.signOut();
    });
    auth.on("sign-in", (response) => {
        alert("You have successfully signed in!");
        console.log(response);
        auth.getIDToken().then((idToken) => {
            console.log(idToken);
        })
    });
    logtoken.addEventListener("click", async function (ev){
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const session_state = urlParams.get('session_state');
        const state = urlParams.get('state');

        console.log(code,session_state,state);
        const accessToken = await auth.getAccessToken(code,session_state,state);
        console.log(accessToken);
    });
  });