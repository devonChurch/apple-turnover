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

// AWS.config.region = '<YOUR_REGION>';

const TEMP_VERSION = 0.12;
const REGION = "us-east-1";
const USER_POOL_ID = "us-east-1_FxcXhUibI";
const IDENTITY_POOL_ID = "us-east-1:3a69f09f-23d7-48d9-8112-b93e0a513e97";
const CLIENT_ID = "7ra42ecc2c3vgmvq4sel1j8hns";
console.log(`main ${TEMP_VERSION}`);

const createDynamoClient = () =>
  // new DynamoDB.DocumentClient({
  new AWS.DynamoDB.DocumentClient({
    region: REGION // AWS.config.region
  });

console.log("DYNAMO CLIENT", createDynamoClient());

const onSuccess = result => {
  console.log("signin SUCCESS", result);
  console.log("JWT", result.getIdToken().getJwtToken());

  AWS.config.region = REGION;

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
    Logins: {
      // Change the key below according to the specific region your user pool is in.
      [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: result
        .getIdToken()
        .getJwtToken()
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
      // /////////////////////////////////////////////////
      // /////////////////////////////////////////////////
      // /////////////////////////////////////////////////

      // const params = {
      //   TableName: "apple-turnover",
      //   Key: {
      //     userid: {
      //       S: '7f364262-bce1-4567-9f49-e2da8b383360'
      //     }
      //   }
      // };
      // client.get(params, function(err, data) {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log(data);
      //   }
      // });

      // /////////////////////////////////////////////////
      // /////////////////////////////////////////////////
      // /////////////////////////////////////////////////

      const params = {
        TableName: "apple-turnover",
        Item: {
          userid: "7f364262-bce1-4567-9f49-e2da8b383360",
          image: "potato"
          // userid: {
          //   S: "7f364262-bce1-4567-9f49-e2da8b383360"
          // },
          // image: {
          //   S: "potato"
          // }
        }
      };

      client.put(params, function(err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
        /*
        data = {
        ConsumedCapacity: {
          CapacityUnits: 1, 
          TableName: "Music"
        }
        }
        */
      });
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
  });
};

const onFailure = error => {
  console.error("signin ERROR", error);
};

const createAuth = () =>
  new CognitoAuth({
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
    // IdentityProvider: "<TODO: add identity provider you want to specify>", // e.g. 'Facebook',
    UserPoolId: USER_POOL_ID // Your user pool id here
    // AdvancedSecurityDataCollectionFlag: "<TODO: boolean value indicating whether you want to enable advanced security data collection>" // e.g. true
  });

const init = () => {
  const auth = createAuth();
  const { href } = window.location;
  const $signinNav = document.getElementById("signin-nav-button");
  const $signinOut = document.getElementById("signout-nav-button");
  const $signinMain = document.getElementById("signin-main-button");
  const isSignedIn = auth.isUserSignedIn();
  console.log("is signed in", isSignedIn);
  console.log("current user", auth.getCurrentUser());

  auth.userhandler = { onSuccess, onFailure };
  auth.parseCognitoWebResponse(href);

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

    // AWS.config.region = REGION; // Region
    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: IDENTITY_POOL_ID,
    //   Logins: {
    //     // Change the key below according to the specific region your user pool is in.
    //     [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: auth
    //       .signInUserSession.accessToken.jwtToken // session.getIdToken().getJwtToken()
    //   }
    // });

    /*
    var authenticationData = {
      Username: "username",
      Password: "password"
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    const { username } = auth;
    var poolData = {
      UserPoolId: USER_POOL_ID, // '...', // Your user pool id here
      ClientId: CLIENT_ID // '...' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = REGION;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: result
              .getIdToken()
              .getJwtToken()
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
          }
        });
      },

      onFailure: function(err) {
        alert(err);
      }
    });
    */

    // const client = createDynamoClient();
    // const { username } = auth;
    // const params = {
    //   TableName: "apple-turnover",
    //   Key: {
    //     userid: {
    //       S: username
    //     }
    //   }
    // };
    // client.get(params, function(err, data) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(data);
    //   }
    // });
  } else {
    console.log("Not signed in");
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  console.log("AWS", AWS);

  /*
  var data = {
    UserPoolId: "us-east-1_FxcXhUibI",
    ClientId: "7ra42ecc2c3vgmvq4sel1j8hns"
  };
  console.log(
    "new AWS.CognitoIdentityServiceProvider",
    new AWS.CognitoIdentityServiceProvider()
  );
  // var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
  var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  cognitoUser.getSession(function(err, session) {
    if (err) {
      console.log(err);
      return;
    }

    console.log("session validity: " + session.isValid());
    console.log("session token: " + session.getIdToken().getJwtToken());

    AWS.config.region = "us-east-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-1_FxcXhUibI",
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        [`cognito-idp.${AWS.config.region}.amazonaws.com/${
          data.UserPoolId
        }`]: session.getIdToken().getJwtToken()
      }
    });

    AWS.config.credentials.get(function(err) {
      if (!err) {
        var id = AWS.config.credentials.identityId;
        console.log("Cognito Identity ID " + id);

        // Instantiate aws sdk service objects now that the credentials have been updated
        var docClient = new AWS.DynamoDB.DocumentClient({
          region: AWS.config.region
        });
        const params = {
          TableName: "apple-turnover",
          Key: {
            userid: {
              S: "1234567890"
            }
          }
        };
        docClient.get(params, function(err, data) {
          if (err) {
            console.error(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  });
  */

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /*
  // AWS.config.region = '<YOUR_REGION>';
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId : '<YOUR_IDENTITY_POOL_ID>', 
    //   Logins: {
      //     // Change the key below according to the specific region your user pool is in.
      //     `cognito-idp.${AWS.config.region}.amazonaws.com/${data.UserPoolId}` : session.getIdToken().getJwtToken()
      //   }
      // });

  AWS.config.credentials.get(function(err) {
    if (!err) {
      const dynamoClient = createDynamoClient();

      console.log("dynamoClient", dynamoClient);

      const params = {
        TableName: "apple-turnover",
        Key: {
          userid: {
            S: "1234567890"
          }
        }
      };

      // dynamoClient.getItem(params, (error, response) => {
      dynamoClient.get(params, (error, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log(response);
        }
      });
    }
  });
  */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  console.log("auth", auth);
};

init();
