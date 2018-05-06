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

const TEMP_VERSION = "0.48";
const REGION = "us-east-1";
const USER_POOL_ID = "us-east-1_FxcXhUibI";
const IDENTITY_POOL_ID = "us-east-1:3a69f09f-23d7-48d9-8112-b93e0a513e97";
const CLIENT_ID = "7ra42ecc2c3vgmvq4sel1j8hns";
const LOGIN_KEY = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
const TABLE_NAME = "apple-turnover";
const PUBLIC_BUCKET = "apple-turnover-private";
const PRIVATE_BUCKET = "apple-turnover-private";
const PLACE_HOLDER_HERO = "/img/placeholder-hero.png";
const PLACE_HOLDER_THUMBNAIL = "/img/placeholder-thumbnail.png";
const BASE_URL = "https://d1ebj83u34dou6.cloudfront.net";
const COGNITO_DOMAIN = "apple-turnover.auth.us-east-1.amazoncognito.com";
const EXPIRES = 60; // 1 minute.

AWS.config.region = REGION;

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
            onClick={() => auth.getSession()}
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

const SignedinContent = ({ currentImage, updateImage, hero, thumbnails }) => (
  <main>
    <div className="container-fluid pt-5">
      <div className="row justify-content-md-center">
        <div className="col col-md-8 col-lg-6">
          <h1 className="display-4">Welcome back,</h1>
          <p>Please select your preferred image.</p>
        </div>
      </div>
    </div>

    {hero && (
      <div className="container-fluid pt-5">
        <div className="row justify-content-md-center">
          <div className="col col-md-10 col-lg-8">
            <img
              src={hero || PLACE_HOLDER_HERO}
              style={{ width: "100%" }}
              class="img-fluid img-thumbnail"
              alt={`${currentImage} hero`}
            />
          </div>
        </div>
      </div>
    )}

    <div className="container-fluid pt-5">
      <div className="row justify-content-md-center">
        {Object.keys(thumbnails).map(key => (
          <div className="col-4 col-md-3 col-lg-2">
            <Thumbnail
              source={thumbnails[key] || PLACE_HOLDER_THUMBNAIL}
              altText={`${key} thumbnail`}
              title={key}
              onClick={() => updateImage(key)}
              isSelected={currentImage === key}
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
      onClick={() => auth.signOut()}
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
  <div class={`alert alert-${sentiment} mb-0`} role="alert">
    {message}
  </div>
);

class Application extends React.Component {
  constructor() {
    super();
    this.user = null;
    this.dynamoClient = null;
    this.s3Client = null;
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
      currentImage: "",
      hero: "",
      thumbnails: {}
    };

    if (this.isSignedIn) {
      const { href } = window.location;
      this.state.currentStatus = "signedIn";
      this.auth.getSession();
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

    return { sentiment, message };
  }

  getHeroUrl(image) {
    return image
      ? new Promise((resolve, reject) => {
          this.s3Client.getSignedUrl(
            "getObject",
            {
              Key: `${image}-hero.jpg`,
              Bucket: PRIVATE_BUCKET,
              Expires: EXPIRES
            },
            (error, response) => {
              if (error) reject(error);
              resolve(response);
            }
          );
        }).then(url => {
          this.setState(Object.assign({}, this.state, { hero: url }));
        })
      : Promise.resolve();
  }

  getThumbnailUrls() {
    const requests = ["plant", "sunset", "stream"].map(
      name =>
        new Promise((resolve, reject) => {
          this.s3Client.getSignedUrl(
            "getObject",
            {
              Key: `${name}-thumb.jpg`,
              Bucket: PRIVATE_BUCKET,
              Expires: EXPIRES
            },
            (error, response) => {
              if (error) reject(error);
              resolve(response);
            }
          );
        })
    );

    return Promise.all(requests).then(urls => {
      const [plant, sunset, stream] = urls;
      const thumbnails = { plant, sunset, stream };
      this.setState(Object.assign({}, this.state, { thumbnails }));
    });
  }

  createAuth() {
    const { href } = window.location;
    const auth = new CognitoAuth({
      ClientId: CLIENT_ID,
      AppWebDomain: COGNITO_DOMAIN,
      TokenScopesArray: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin"
      ],
      RedirectUriSignIn: `${BASE_URL}/`,
      RedirectUriSignOut: `${BASE_URL}/?message=You+have+been+signed+out&sentiment=danger`,
      UserPoolId: USER_POOL_ID
    });

    auth.userhandler = {
      onSuccess: user => this.onAuthSuccess(user),
      onFailure: error => this.onAuthFailure(error)
    };
    auth.parseCognitoWebResponse(href);

    return auth;
  }

  onAuthSuccess(user) {
    this.user = user;
    this.setCredentials()
      .then(() => {
        const status = this.auth.isUserSignedIn() ? "signedIn" : "signedOut";
        this.updateStatus(status);
        return Promise.resolve();
      })
      .then(() => this.createDynamoClient())
      .then(() => this.createS3Client())
      .then(() => this.getUserImage())
      .then(response => {
        console.log("response", response);
        const image = (response && response.Item && response.Item.image) || "";
        this.setState(Object.assign({}, this.state, { currentImage: image }));
        return Promise.resolve(image);
      })
      .then(image => this.getHeroUrl(image))
      .then(() => this.getThumbnailUrls())
      .catch(error => console.error(error));
  }

  onAuthFailure(error) {
    console.error(error);
  }

  createDynamoClient() {
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    return Promise.resolve();
  }

  createS3Client() {
    this.s3Client = new AWS.S3({ apiVersion: "2006-03-01" });
    return Promise.resolve();
  }

  updateImage(currentImage) {
    this.setState(Object.assign({}, this.state, { currentImage }));

    const params = {
      TableName: TABLE_NAME,
      Item: {
        userid: this.auth.username,
        image: currentImage
      }
    };

    this.getHeroUrl(currentImage);

    this.dynamoClient
      .put(params)
      .promise()
      .catch(error => console.error(error));
  }

  updateStatus(currentStatus) {
    this.setState(Object.assign({}, this.state, { currentStatus }));
  }

  setCredentials() {
    console.log("this.user", this.user);
    const params = {
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: { [`${LOGIN_KEY}`]: this.user.getIdToken().getJwtToken() }
    };
    let credentials = new AWS.CognitoIdentityCredentials(params);

    credentials.clearCachedId();
    credentials = new AWS.CognitoIdentityCredentials(params);
    AWS.config.credentials = credentials;

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
        userid: this.auth.username
      }
    };

    return this.dynamoClient.get(params).promise();
  }

  render() {
    const { currentStatus, currentImage, hero, thumbnails } = this.state;
    const { auth, alertProps } = this;
    const isLoading = currentStatus === "loading";
    const isSignedIn = currentStatus === "signedIn";
    const isSignedOut = currentStatus === "signedOut";

    return isSignedIn ? (
      <div>
        <Alert {...alertProps} />
        <Navigation auth={auth} />
        <SignedinContent
          auth={auth}
          currentImage={currentImage}
          updateImage={this.updateImage}
          hero={hero}
          thumbnails={thumbnails}
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

(() => {
  const $application = document.getElementById("app");

  ReactDOM.render(<Application />, $application);
})();
