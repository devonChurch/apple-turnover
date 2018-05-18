# Apple Turnover

A proof of concept exploring **AWS Cognito** and its **User Pool**, **Resource Federation**, and **Signed URL** functionality.

The demo application was generated using **Serverless** principals, utilising *low cost*, *performant* and *scalable* systems within the **AWS** portfolio.

## Architecture

![apple-turnover](https://user-images.githubusercontent.com/15273233/40226236-36d3bf4e-5adf-11e8-9592-977f141c2920.png)

## Functionality

1. User are greeted with an *unauthenticated* "welcome" page.

2. Upon *registering* or *logging in* via **AWS Cognito** users are taken to the *application* view.
3. Any previous data associated to the user is obtained from **AWS DynamoDB** through *federated access*
   *(This prevents unauthenticated users from interfacing with the database endpoint)*.

4. Any private assets associated with the current view are obtained via **AWS S3** through *signed URL* access.
   *(This white lists private buckets assets to authenticated users)*.

5. Changes made to the users settings are persisted in **AWS DynamoDB** for returning visits.

6. If a user closes the application without logging out their *authenticated* state will be remembered on the subsequent visit.

7. If a user explicitly logs out of the application they will be prompted to *reauthenticate* at the "welcome" page upon nest visit. 

![cognito](https://user-images.githubusercontent.com/15273233/40226263-47c87222-5adf-11e8-8356-a179f87025de.png)

## Installation

* Clone this repository

  ```
  git clone https://github.com/devonChurch/apple-turnover.git
  ```

* Install project dependancies

  ```
  npm install
  ```
  
## Deployment

* Build and deploy a _production_ version of the application to your repositories **AWS S3**

```
npm run deploy
```

## License

MIT
