import React from "react";
import ReactDOM from "react-dom";
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

const TEMP_VERSION = "0.41";
const REGION = "us-east-1";
const USER_POOL_ID = "us-east-1_FxcXhUibI";
const IDENTITY_POOL_ID = "us-east-1:3a69f09f-23d7-48d9-8112-b93e0a513e97";
const CLIENT_ID = "7ra42ecc2c3vgmvq4sel1j8hns";
const LOGIN_KEY = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
const TABLE_NAME = "apple-turnover";

AWS.config.region = REGION;

console.log(`main ${TEMP_VERSION}`);

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
        {["xxxxx", "yyyyyy", "zzzzzz"].map(name => (
          <div className="col-4">
            <Thumbnail
              source={`xxxxxx/${name}.jpg`}
              altText={`${name} thumbnail`}
              title={name}
              onClick={() => updateImage(name)}
              isSelected={currentImage === name}
            />
          </div>
        ))}
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

const Loading = () => (
  <div className="container-fluid pt-5">
    <div className="row">
      <div className="col-sm">
        <div class="alert alert-primary" role="alert">
          Loading application.
        </div>
      </div>
    </div>
  </div>
);

const Alert = ({ message, sentiment }) => (
  <div class={`alert alert-${sentiment}`} role="alert">
    {message}
  </div>
);

class Application extends React.Component {
  constructor() {
    console.log("Application");
    super();
    this.user = null;
    this.dynamoClient = null;
    this.auth = this.createAuth();
    this.isSignedIn = this.auth.isUserSignedIn();
    this.updateImage = this.updateImage.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.onAuthSuccess = this.onAuthSuccess.bind(this);
    this.onAuthFailure = this.onAuthFailure.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
    this.alertProps = this.createAlertProps();
    this.state = {
      currentStatus: "loading",
      currentImage: ""
    };

    if (this.isSignedIn) {
      const { href } = window.location;
      this.state.currentStatus = "signedIn";
      this.auth.parseCognitoWebResponse(href);
    } else {
      this.state.currentStatus = "signedOut";
    }
  }

  // prettier-ignore
  createAlertProps() {
    const { search } = window.location;
    const { isSignedIn } = this;
    const params = new URLSearchParams(search);
    const sentiment = params.has("sentiment") ? params.get("sentiment") : isSignedIn ? "success" : "warning";
    const message = params.has("message") ? params.get("message") : isSignedIn ? "You are signed in" : "You need to sign in";
    console.log({search, isSignedIn, s:params.get("sentiment"), m: params.get("message"), sentiment, message})
    return { sentiment, message };
  }

  createAuth() {
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
      RedirectUriSignOut:
        "https://d1ebj83u34dou6.cloudfront.net/?message=You+have+been+signed+out&sentiment=danger",
      UserPoolId: USER_POOL_ID
    });

    auth.userhandler = {
      onSuccess: user => this.onAuthSuccess(user),
      onFailure: error => this.onAuthFailure(error)
    };
    auth.parseCognitoWebResponse(href);

    console.log("auth", auth);

    return auth;
  }

  onAuthSuccess(user) {
    console.log("onAuthSuccess", user);
    console.log("onAuthSuccess (this)", this);
    this.user = user;
    this.setCredentials()
      .then(() => {
        const status = this.auth.isUserSignedIn() ? "signedIn" : "signedOut";
        this.updateStatus(status);
        return Promise.resolve();
      })
      .then(
        () =>
          this.dynamoClient ? Promise.resolve() : this.createDynamoClient()
      )
      .then(() => console.log("got credentials") || this.getUserImage())
      .then(({ Item: { image } }) => this.updateImage(image))
      .catch(error => console.error(error));
  }

  onAuthFailure(error) {
    console.error("signin ERROR", error);
  }

  createDynamoClient() {
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    return Promise.resolve();
  }

  updateImage(currentImage) {
    console.log("updateImage", currentImage);
    this.setState(Object.assign({}, this.state, { currentImage }));

    const params = {
      TableName: TABLE_NAME,
      Item: {
        userid: this.auth.username,
        image: currentImage
      }
    };

    this.dynamoClient
      .put(params)
      .promise()
      .catch(error => console.error(error));
  }

  updateStatus(currentStatus) {
    this.setState(Object.assign({}, this.state, { currentStatus }));
  }

  setCredentials() {
    console.log("setCredentials");
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: {
        [`${LOGIN_KEY}`]: this.user.getIdToken().getJwtToken()
      }
    });

    return new Promise((resolve, reject) => {
      AWS.config.credentials.refresh(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  getUserImage() {
    var params = {
      TableName: TABLE_NAME,
      Key: {
        userid: this.auth.username // "7f364262-bce1-4567-9f49-e2da8b383360"
      }
    };

    console.log("getUserImage", params);

    return this.dynamoClient.get(params).promise();
  }

  render() {
    const { currentStatus, currentImage } = this.state;
    const { auth, alertProps } = this;
    const isLoading = currentStatus === "loading";
    const isSignedIn = currentStatus === "signedIn";
    const isSignedOut = currentStatus === "signedOut";

    console.log("is signed in", {
      isLoading,
      isSignedIn,
      isSignedOut,
      auth,
      currentStatus,
      currentImage
    });

    return isSignedIn ? (
      <div>
        <Alert {...alertProps} />
        <Navigation auth={auth} />
        <SignedinContent
          auth={auth}
          currentImage={currentImage}
          updateImage={this.updateImage}
        />
      </div>
    ) : isSignedOut ? (
      <div>
        <Alert {...alertProps} />
        <SignedoutContent auth={auth} />
      </div>
    ) : (
      <div>
        <Loading />
      </div>
    );
  }
}

const init = () => {
  const $application = document.getElementById("app");

  console.log("AWS", AWS);

  ReactDOM.render(<Application />, $application);
};

init();
