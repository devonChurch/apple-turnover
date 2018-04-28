var React = require("react");
var ReactDOM = require("react-dom");

import { CognitoAuth } from "amazon-cognito-auth-js";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";
import { PureComponent } from "react";
import AWS from "aws-sdk";
// import DynamoDB from "aws-sdk/clients/dynamodb"; // AWS.DynamoDB
import "./foo";
import "./bar";

const TEMP_VERSION = 0.13;
const REGION = "us-east-1";
const USER_POOL_ID = "us-east-1_FxcXhUibI";
const IDENTITY_POOL_ID = "us-east-1:3a69f09f-23d7-48d9-8112-b93e0a513e97";
const CLIENT_ID = "7ra42ecc2c3vgmvq4sel1j8hns";
const LOGIN_KEY = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;

console.log(`main ${TEMP_VERSION}`);

AWS.config.region = REGION;

const createDynamoClient = () => new AWS.DynamoDB.DocumentClient();

console.log("DYNAMO CLIENT", createDynamoClient());

const onSuccess = result => {
  console.log("signin SUCCESS", result);
  console.log("JWT", result.getIdToken().getJwtToken());

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
    Logins: {
      [`${LOGIN_KEY}`]: result.getIdToken().getJwtToken()
    }
  });

  //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
  AWS.config.credentials.refresh(error => {
    if (error) {
      console.error(error);
    } else {
      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3();
      console.log("Successfully logged!");

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      const client = createDynamoClient();
      console.log("client", client);

      const params = {
        TableName: "apple-turnover",
        Item: {
          userid: "7f364262-bce1-4567-9f49-e2da8b383360",
          image: "potato"
        }
      };

      client.put(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
  });
};

const onFailure = error => {
  console.error("signin ERROR", error);
};

// const createNavigation = (auth, isSignedIn) => {
//   const $navigation = document.getElementById("navigation");
//   const $signOutBtn = document.getElementById("signout-button");

//   if (isSignedIn) {
//     $navigation.style.display = "block";
//     $signOutBtn.addEventListener("click", () => {
//       console.log("signout");
//       if (isSignedIn) {
//         auth.signOut();
//       }
//     });
//   } else {
//     $navigation.style.display = "none";
//   }
// };

const createAuth = () => {
  const { href } = window.location;
  const auth = new CognitoAuth({
    ClientId: CLIENT_ID,
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
    UserPoolId: USER_POOL_ID
  });

  auth.userhandler = { onSuccess, onFailure };
  auth.parseCognitoWebResponse(href);

  return auth;
};

// const createSignedInCintent = () => {};

// const createSignedOutCintent = () => {
//   const $signInBtn = document.getElementById("signin-button");

//   $signInBtn.addEventListener("click", () => {
//     console.log("get session");
//     if (!isSignedIn) {
//       auth.getSession();
//     }
//   });
// };

const Thumbnail = ({ source, altText, title, onClick, isSelected }) => (
  <div className="card">
    <img className="card-img-top" src={source} alt={altText} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>

      <button
        onClick={onClick}
        type="button"
        className="btn btn-outline-primary btn-sm"
        disabled={isSelected}
      >
        Select
      </button>
    </div>
  </div>
);

const SignedoutContent = ({ auth }) => (
  <main>
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-sm">
          <h1 className="display-4">Hello,</h1>
          <p>Please signin.</p>
          <button
            onClick={() => {
              console.log("get in");
              auth.getSession();
            }}
            type="button"
            className="btn btn-primary"
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  </main>
);

const SignedinContent = ({ currentImage, updateImage }) => (
  <main>
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-sm">
          <h1 className="display-4">Welcome back,</h1>
          <p>Please select your preferred image.</p>
        </div>
      </div>
    </div>

    {currentImage && (
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col">
            <img
              src={`xxxxxxx/${currentImage}.jpg`}
              class="img-fluid"
              alt={`${currentImage} hero`}
            />
          </div>
        </div>
      </div>
    )}

    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-4">
          <Thumbnail
            source={`xxxxxx/${currentImage}.jpg`}
            altText="plant thumbnail"
            title="plant"
            onClick={() => updateImage("plant")}
            isSelected={currentImage === "plant"}
          />
        </div>
        <div className="col-4">
          <Thumbnail
            source={`xxxxxx/${currentImage}.jpg`}
            altText="sunset thumbnail"
            title="sunset"
            onClick={() => updateImage("sunset")}
            isSelected={currentImage === "sunset"}
          />
        </div>
        <div className="col-4">
          <Thumbnail
            source={`xxxxxx/${currentImage}.jpg`}
            altText="stream thumbnail"
            title="stream"
            onClick={() => updateImage("stream")}
            isSelected={currentImage === "stream"}
          />
        </div>
      </div>
    </div>
  </main>
);

const Navigation = ({ auth }) => (
  <nav className="navbar navbar-dark bg-primary">
    <button
      onClick={() => {
        console.log("get out");
        auth.signOut();
      }}
      type="button"
      className="btn btn-outline-light btn-sm"
    >
      Signout
    </button>
  </nav>
);

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: createAuth(),
      currentImage: ""
    };
    this.updateImage = this.updateImage.bind(this);
  }

  updateImage(currentImage) {
    this.setState(Object.assign({}, this.state, { currentImage }));
  }
  render() {
    const { auth, currentImage } = this.state;
    const isSignedIn = !auth.isUserSignedIn();

    console.log("is signed in", isSignedIn);

    return (
      <div>
        {isSignedIn && <Navigation auth={auth} />}
        {isSignedIn ? (
          <SignedinContent
            auth={auth}
            currentImage={currentImage}
            updateImage={this.updateImage}
          />
        ) : (
          <SignedoutContent auth={auth} />
        )}
      </div>
    );
  }
}

const init = () => {
  const $application = document.getElementById("app");
  // const auth = createAuth();
  // const { href } = window.location;
  // const $heroImage = document.getElementById("hero-image");
  // const $thumbnailImages = document.getElementById("thumbnail-images");

  // console.log("current user", auth.getCurrentUser());

  console.log("AWS", AWS);

  ReactDOM.render(<Application />, $application);
};

init();
