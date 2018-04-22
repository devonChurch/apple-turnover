import { CognitoAuth } from "amazon-cognito-auth-js";
import "./foo";
import "./bar";

const TEMP_VERSION = 0.2;
console.log(`main ${TEMP_VERSION}`);

const onSuccess = result => {
  console.log("signin SUCCESS", result);
};

const onFailure = error => {
  console.error("signin ERROR", error);
};

const createAuth = () =>
  new CognitoAuth({
    ClientId: "7ra42ecc2c3vgmvq4sel1j8hns",
    AppWebDomain: "apple-turnover.auth.us-east-1.amazoncognito.com",
    TokenScopesArray: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin"
    ],
    RedirectUriSignIn: "https://d1ebj83u34dou6.cloudfront.net/",
    RedirectUriSignOut: "https://d1ebj83u34dou6.cloudfront.net/signout/",
    // IdentityProvider: "<TODO: add identity provider you want to specify>", // e.g. 'Facebook',
    UserPoolId: "us-east-1_FxcXhUibI" // Your user pool id here
    // AdvancedSecurityDataCollectionFlag: "<TODO: boolean value indicating whether you want to enable advanced security data collection>" // e.g. true
  });

const init = () => {
  const auth = createAuth();
  const { href } = window.location;
  const $signinNav = document.getElementById("signin-nav-button");
  const $signinOut = document.getElementById("signout-nav-button");
  const $signinMain = document.getElementById("signin-main-button");

  auth.userhandler = { onSuccess, onFailure };
  auth.parseCognitoWebResponse(href);

  const isSignedIn = auth.isUserSignedIn();
  console.log("is signed in", isSignedIn);
  console.log("current user", auth.getCurrentUser());

  [$signinNav, $signinMain].forEach($button => {
    $button.addEventListener("click", () => {
      console.log("get session");
      if (!isSignedIn) {
        auth.getSession();
      }
    });
  });

  $signinOut.addEventListener("click", () => {
    console.log("signout");
    if (isSignedIn) {
      auth.signOut();
    }
  });

  if (isSignedIn) {
    console.log("Already signed in");
  } else {
    console.log("Not signed in");
  }

  console.log("auth", auth);
};

init();
