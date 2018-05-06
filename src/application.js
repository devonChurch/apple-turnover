import React from "react";
import AWS from "aws-sdk";
import { CognitoAuth } from "amazon-cognito-auth-js";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";
import SignedoutContent from "./signedout-content";
import SignedinContent from "./signedin-content";
import Navigation from "./navigation";
import Loading from "./loading";
import Alert from "./alert";

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
    const params = {
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: { [`${LOGIN_KEY}`]: this.user.getIdToken().getJwtToken() }
    };
    let credentials = new AWS.CognitoIdentityCredentials(params);

    // Cache Bust (https://github.com/aws/aws-sdk-js/issues/609).
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
          placeHolderHero={PLACE_HOLDER_HERO}
          placeHolderThumbanil={PLACE_HOLDER_THUMBNAIL}
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

export default Application;
