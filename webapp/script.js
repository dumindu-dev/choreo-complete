document.addEventListener('DOMContentLoaded', function() {
    var auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

    auth.initialize({
        signInRedirectURL: "https://cd6d367e-4626-44a8-a4c7-a7797269f06c.e1-us-east-azure.choreoapps.dev/index.html",
        signOutRedirectURL: "https://cd6d367e-4626-44a8-a4c7-a7797269f06c.e1-us-east-azure.choreoapps.dev/index.html",
        clientID: "DOXfRsMgXVq6QTF0BiHrfPN6Ucsa",
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
        auth.getAccessToken().then((accessToken)=>{
            console.log(accessToken);
        });
        auth.getBasicUserInfo().then((userinfoResponse) => {
            console.log(userinfoResponse); // check userinfo response
            console.log(userinfoResponse.email);  // check email
     
        }).catch((error) => {
            console.error(error);
        });
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