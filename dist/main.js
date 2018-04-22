!function(t){var e={};function n(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.jwtToken=e||"",this.payload=this.decodePayload()}return t.prototype.getJwtToken=function(){return this.jwtToken},t.prototype.setJwtToken=function(t){this.jwtToken=t},t.prototype.getExpiration=function(){if(null!==this.jwtToken){var t=this.jwtToken.split(".")[1];return JSON.parse(atob(t)).exp}},t.prototype.getUsername=function(){if(null!==this.jwtToken){var t=this.jwtToken.split(".")[1];return JSON.parse(atob(t)).username}},t.prototype.decodePayload=function(){var t=this.jwtToken.split(".")[1];try{return JSON.parse(atob(t))}catch(t){return{}}},t}();
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.jwtToken=e||"",this.payload=this.decodePayload()}return t.prototype.getJwtToken=function(){return this.jwtToken},t.prototype.setJwtToken=function(t){this.jwtToken=t},t.prototype.getExpiration=function(){if(null!==this.jwtToken){var t=this.jwtToken.split(".")[1];return JSON.parse(atob(t)).exp}},t.prototype.decodePayload=function(){var t=this.jwtToken.split(".")[1];try{return JSON.parse(atob(t))}catch(t){return{}}},t}();
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var i=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.refreshToken=e||""}return t.prototype.getToken=function(){return this.refreshToken},t.prototype.setToken=function(t){this.refreshToken=t},t}();
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tokenScopes=e||[]}return t.prototype.getScopes=function(){return this.tokenScopes},t.prototype.setTokenScopes=function(t){this.tokenScopes=t},t}();
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.IdToken,a=e.RefreshToken,g=e.AccessToken,h=e.TokenScopes,c=e.State;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.idToken=n||new o,this.refreshToken=a||new i,this.accessToken=g||new s,this.tokenScopes=h||new r,this.state=c||null}return t.prototype.getIdToken=function(){return this.idToken},t.prototype.setIdToken=function(t){this.idToken=t},t.prototype.getRefreshToken=function(){return this.refreshToken},t.prototype.setRefreshToken=function(t){this.refreshToken=t},t.prototype.getAccessToken=function(){return this.accessToken},t.prototype.setAccessToken=function(t){this.accessToken=t},t.prototype.getTokenScopes=function(){return this.tokenScopes},t.prototype.setTokenScopes=function(t){this.tokenScopes=t},t.prototype.getState=function(){return this.state},t.prototype.setState=function(t){this.state=t},t.prototype.isValid=function(){var t=Math.floor(new Date/1e3);try{return null!=this.accessToken?t<this.accessToken.getExpiration():null!=this.idToken&&t<this.idToken.getExpiration()}catch(t){return!1}},t}();function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */var h={},c=function(){function t(){g(this,t)}return t.setItem=function(t,e){return h[t]=e,h[t]},t.getItem=function(t){return Object.prototype.hasOwnProperty.call(h,t)?h[t]:void 0},t.removeItem=function(t){return delete h[t]},t.clear=function(){return h={}},t}(),u=function(){function t(){g(this,t);try{this.storageWindow=window.localStorage,this.storageWindow.setItem("aws.cognito.test-ls",1),this.storageWindow.removeItem("aws.cognito.test-ls")}catch(t){this.storageWindow=c}}return t.prototype.getStorage=function(){return this.storageWindow},t}(),p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};
/*!
  * Amazon Cognito Auth SDK for JavaScript
  * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License").
  * You may not use this file except in compliance with the License.
  * A copy of the License is located at
  *
  *         http://aws.amazon.com/apache2.0/
  *
  * or in the "license" file accompanying this file.
  * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
  * OR CONDITIONS OF ANY KIND, either express or implied. See the
  * License for the specific language governing permissions
  * and limitations under the License.
  */
var S=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=e||{},s=n.ClientId,o=n.AppWebDomain,i=n.TokenScopesArray,g=n.RedirectUriSignIn,h=n.RedirectUriSignOut,c=n.IdentityProvider,p=n.UserPoolId,S=n.AdvancedSecurityDataCollectionFlag;if(!(null!=e&&s&&o&&g&&h))throw new Error(this.getCognitoConstants().PARAMETERERROR);if(this.clientId=s,this.appWebDomain=o,this.TokenScopesArray=i||[],!Array.isArray(i))throw new Error(this.getCognitoConstants().SCOPETYPEERROR);var C=new r(this.TokenScopesArray);this.RedirectUriSignIn=g,this.RedirectUriSignOut=h,this.IdentityProvider=c,this.signInUserSession=new a,this.responseType=this.getCognitoConstants().TOKEN,this.storage=(new u).getStorage(),this.signInUserSession.setTokenScopes(C),this.username=this.getLastUser(),this.userPoolId=p,this.advancedSecurityDataCollectionFlag=!0,S&&(this.advancedSecurityDataCollectionFlag=S)}return t.prototype.getCognitoConstants=function(){return{DOMAIN_SCHEME:"https",DOMAIN_PATH_SIGNIN:"oauth2/authorize",DOMAIN_PATH_TOKEN:"oauth2/token",DOMAIN_PATH_SIGNOUT:"logout",DOMAIN_QUERY_PARAM_REDIRECT_URI:"redirect_uri",DOMAIN_QUERY_PARAM_SIGNOUT_URI:"logout_uri",DOMAIN_QUERY_PARAM_RESPONSE_TYPE:"response_type",DOMAIN_QUERY_PARAM_IDENTITY_PROVIDER:"identity_provider",DOMAIN_QUERY_PARAM_USERCONTEXTDATA:"userContextData",CLIENT_ID:"client_id",STATE:"state",SCOPE:"scope",TOKEN:"token",CODE:"code",POST:"POST",PARAMETERERROR:"The parameters: App client Id, App web domain, the redirect URL when you are signed in and the redirect URL when you are signed out are required.",SCOPETYPEERROR:"Scopes have to be array type. ",QUESTIONMARK:"?",POUNDSIGN:"#",COLONDOUBLESLASH:"://",SLASH:"/",AMPERSAND:"&",EQUALSIGN:"=",SPACE:" ",CONTENTTYPE:"Content-Type",CONTENTTYPEVALUE:"application/x-www-form-urlencoded",AUTHORIZATIONCODE:"authorization_code",IDTOKEN:"id_token",ACCESSTOKEN:"access_token",REFRESHTOKEN:"refresh_token",ERROR:"error",ERROR_DESCRIPTION:"error_description",STRINGTYPE:"string",STATELENGTH:32,STATEORIGINSTRING:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",WITHCREDENTIALS:"withCredentials",UNDEFINED:"undefined",SELF:"_self",HOSTNAMEREGEX:/:\/\/([0-9]?\.)?(.[^/:]+)/i,QUERYPARAMETERREGEX1:/#(.+)/,QUERYPARAMETERREGEX2:/=(.+)/,HEADER:{"Content-Type":"application/x-www-form-urlencoded"}}},t.prototype.getClientId=function(){return this.clientId},t.prototype.getAppWebDomain=function(){return this.appWebDomain},t.prototype.getCurrentUser=function(){var t="CognitoIdentityServiceProvider."+this.clientId+".LastAuthUser";return this.storage.getItem(t)},t.prototype.setUser=function(t){this.username=t},t.prototype.useCodeGrantFlow=function(){this.responseType=this.getCognitoConstants().CODE},t.prototype.useImplicitFlow=function(){this.responseType=this.getCognitoConstants().TOKEN},t.prototype.getSignInUserSession=function(){return this.signInUserSession},t.prototype.getUsername=function(){return this.username},t.prototype.setUsername=function(t){this.username=t},t.prototype.getState=function(){return this.state},t.prototype.setState=function(t){this.state=t},t.prototype.getSession=function(){var t=new Set(this.TokenScopesArray),e=new Set(this.signInUserSession.tokenScopes.getScopes()),n=this.getFQDNSignIn();if(null!=this.signInUserSession&&this.signInUserSession.isValid())return this.userhandler.onSuccess(this.signInUserSession);if(this.signInUserSession=this.getCachedSession(),this.compareSets(t,e)){if(this.signInUserSession.isValid())return this.userhandler.onSuccess(this.signInUserSession);this.signInUserSession.getRefreshToken()&&this.signInUserSession.getRefreshToken().getToken()?this.refreshSession(this.signInUserSession.getRefreshToken().getToken()):this.launchUri(n)}else{var a=new r(this.TokenScopesArray),g=new o,h=new s,c=new i;this.signInUserSession.setTokenScopes(a),this.signInUserSession.setIdToken(g),this.signInUserSession.setAccessToken(h),this.signInUserSession.setRefreshToken(c),this.launchUri(n)}},t.prototype.parseCognitoWebResponse=function(t){var e=void 0;if(t.indexOf(this.getCognitoConstants().QUESTIONMARK)>-1){var n=t.split(this.getCognitoConstants().POUNDSIGN)[0];e=this.getQueryParameters(n,this.getCognitoConstants().QUESTIONMARK),this.getCodeQueryParameter(e)}else if(t.indexOf(this.getCognitoConstants().POUNDSIGN)>-1){if((e=this.getQueryParameters(t,this.getCognitoConstants().QUERYPARAMETERREGEX1)).has(this.getCognitoConstants().ERROR))return this.userhandler.onFailure(e.get(this.getCognitoConstants().ERROR_DESCRIPTION));this.getTokenQueryParameter(e)}},t.prototype.getCodeQueryParameter=function(t){if(t.has(this.getCognitoConstants().STATE)?this.signInUserSession.setState(t.get(this.getCognitoConstants().STATE)):this.signInUserSession.setState(null),t.has(this.getCognitoConstants().CODE)){var e=t.get(this.getCognitoConstants().CODE),n=this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH,this.getAppWebDomain(),this.getCognitoConstants().SLASH,this.getCognitoConstants().DOMAIN_PATH_TOKEN),s=this.getCognitoConstants().HEADER,o={grant_type:this.getCognitoConstants().AUTHORIZATIONCODE,client_id:this.getClientId(),redirect_uri:this.RedirectUriSignIn,code:e},i=this.onSuccessExchangeForToken.bind(this),r=this.onFailure.bind(this);this.makePOSTRequest(s,o,n,i,r)}},t.prototype.getTokenQueryParameter=function(t){var e=new o,n=new s;new i;t.has(this.getCognitoConstants().IDTOKEN)?(e.setJwtToken(t.get(this.getCognitoConstants().IDTOKEN)),this.signInUserSession.setIdToken(e)):this.signInUserSession.setIdToken(e),t.has(this.getCognitoConstants().ACCESSTOKEN)?(n.setJwtToken(t.get(this.getCognitoConstants().ACCESSTOKEN)),this.signInUserSession.setAccessToken(n)):this.signInUserSession.setAccessToken(n),t.has(this.getCognitoConstants().STATE)?this.signInUserSession.setState(t.get(this.getCognitoConstants().STATE)):this.signInUserSession.setState(null),this.cacheTokensScopes(),this.userhandler.onSuccess(this.signInUserSession)},t.prototype.getCachedSession=function(){if(!this.username)return new a;var t="CognitoIdentityServiceProvider."+this.getClientId()+"."+this.username,e=t+".idToken",n=t+".accessToken",g=t+".refreshToken",h=t+".tokenScopesString",c=this.storage.getItem(h),u=[];c&&(u=c.split(" "));var p=new r(u),S=new o(this.storage.getItem(e)),C=new s(this.storage.getItem(n)),T=new i(this.storage.getItem(g));return new a({IdToken:S,AccessToken:C,RefreshToken:T,TokenScopes:p})},t.prototype.getLastUser=function(){var t="CognitoIdentityServiceProvider."+this.getClientId()+".LastAuthUser",e=this.storage.getItem(t);if(e)return e},t.prototype.cacheTokensScopes=function(){var t="CognitoIdentityServiceProvider."+this.getClientId(),e=this.signInUserSession.getAccessToken().getUsername();this.username=e;var n=t+"."+e+".idToken",s=t+"."+e+".accessToken",o=t+"."+e+".refreshToken",i=t+".LastAuthUser",r=t+"."+e+".tokenScopesString",a=this.signInUserSession.getTokenScopes().getScopes().join(" ");this.storage.setItem(n,this.signInUserSession.getIdToken().getJwtToken()),this.storage.setItem(s,this.signInUserSession.getAccessToken().getJwtToken()),this.storage.setItem(o,this.signInUserSession.getRefreshToken().getToken()),this.storage.setItem(i,e),this.storage.setItem(r,a)},t.prototype.compareSets=function(t,e){if(t.size!==e.size)return!1;var n=t,s=Array.isArray(n),o=0;for(n=s?n:n[Symbol.iterator]();;){var i;if(s){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var r=i;if(!e.has(r))return!1}return!0},t.prototype.getHostName=function(t){var e=t.match(this.getCognitoConstants().HOSTNAMEREGEX);if(null!=e&&e.length>2&&p(e[2])===this.getCognitoConstants().STRINGTYPE&&e[2].length>0)return e[2]},t.prototype.getQueryParameters=function(t,e){var n=String(t).split(e)[1],s=String(n).split(this.getCognitoConstants().AMPERSAND),o=s.length,i=new Map,r=void 0;for(r=0;r<o;r++)s[r]=String(s[r]).split(this.getCognitoConstants().QUERYPARAMETERREGEX2),i.set(s[r][0],s[r][1]);return i},t.prototype.generateRandomString=function(t,e){for(var n="",s=t;s>0;--s)n+=e[Math.round(Math.random()*(e.length-1))];return n},t.prototype.clearCachedTokensScopes=function(){var t="CognitoIdentityServiceProvider."+this.getClientId(),e=t+"."+this.username+".idToken",n=t+"."+this.username+".accessToken",s=t+"."+this.username+".refreshToken",o=t+".LastAuthUser",i=t+"."+this.username+".tokenScopesString";this.storage.removeItem(e),this.storage.removeItem(n),this.storage.removeItem(s),this.storage.removeItem(o),this.storage.removeItem(i)},t.prototype.refreshSession=function(t){var e=this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH,this.getAppWebDomain(),this.getCognitoConstants().SLASH,this.getCognitoConstants().DOMAIN_PATH_TOKEN),n=this.getCognitoConstants().HEADER,s={grant_type:this.getCognitoConstants().REFRESHTOKEN,client_id:this.getClientId(),redirect_uri:this.RedirectUriSignIn,refresh_token:t},o=this.onSuccessRefreshToken.bind(this),i=this.onFailure.bind(this);this.makePOSTRequest(n,s,e,o,i)},t.prototype.makePOSTRequest=function(t,e,n,s,o){var i=this.createCORSRequest(this.getCognitoConstants().POST,n),r="";if(i){for(var a in t)i.setRequestHeader(a,t[a]);for(var g in e)r=r.concat(g,this.getCognitoConstants().EQUALSIGN,e[g],this.getCognitoConstants().AMPERSAND);r=r.substring(0,r.length-1),i.send(r),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?s(i.responseText):o(i.responseText))}}},t.prototype.createCORSRequest=function(t,e){var n=new XMLHttpRequest;return n.open(t,e,!0),this.getCognitoConstants().WITHCREDENTIALS in n?n.open(t,e,!0):("undefined"==typeof XDomainRequest?"undefined":p(XDomainRequest))!==this.getCognitoConstants().UNDEFINED?(n=new XDomainRequest).open(t,e):n=null,n},t.prototype.onFailure=function(t){this.userhandler.onFailure(t)},t.prototype.onSuccessRefreshToken=function(t){var e=JSON.parse(t);if(Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().ERROR)){var n=this.getFQDNSignIn();this.launchUri(n)}else Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().IDTOKEN)&&this.signInUserSession.setIdToken(new o(e.id_token)),Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().ACCESSTOKEN)&&this.signInUserSession.setAccessToken(new s(e.access_token)),this.cacheTokensScopes(),this.userhandler.onSuccess(this.signInUserSession)},t.prototype.onSuccessExchangeForToken=function(t){var e=JSON.parse(t),n=new i,r=new s,a=new o;if(Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().ERROR))return this.userhandler.onFailure(t);Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().IDTOKEN)?this.signInUserSession.setIdToken(new o(e.id_token)):this.signInUserSession.setIdToken(a),Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().ACCESSTOKEN)?this.signInUserSession.setAccessToken(new s(e.access_token)):this.signInUserSession.setAccessToken(r),Object.prototype.hasOwnProperty.call(e,this.getCognitoConstants().REFRESHTOKEN)?this.signInUserSession.setRefreshToken(new i(e.refresh_token)):this.signInUserSession.setRefreshToken(n),this.cacheTokensScopes(),this.userhandler.onSuccess(this.signInUserSession)},t.prototype.launchUri=function(t){window.open(t,this.getCognitoConstants().SELF)},t.prototype.getSpaceSeperatedScopeString=function(){var t=this.signInUserSession.getTokenScopes().getScopes();return t=t.join(this.getCognitoConstants().SPACE),encodeURIComponent(t)},t.prototype.getFQDNSignIn=function(){null==this.state&&(this.state=this.generateRandomString(this.getCognitoConstants().STATELENGTH,this.getCognitoConstants().STATEORIGINSTRING));var t=this.IdentityProvider?this.getCognitoConstants().AMPERSAND.concat(this.getCognitoConstants().DOMAIN_QUERY_PARAM_IDENTITY_PROVIDER,this.getCognitoConstants().EQUALSIGN,this.IdentityProvider):"",e=this.getSpaceSeperatedScopeString(),n="";return this.getUserContextData()&&(n=this.getCognitoConstants().AMPERSAND+this.getCognitoConstants().DOMAIN_QUERY_PARAM_USERCONTEXTDATA+this.getCognitoConstants().EQUALSIGN+this.getUserContextData()),this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH,this.getAppWebDomain(),this.getCognitoConstants().SLASH,this.getCognitoConstants().DOMAIN_PATH_SIGNIN,this.getCognitoConstants().QUESTIONMARK,this.getCognitoConstants().DOMAIN_QUERY_PARAM_REDIRECT_URI,this.getCognitoConstants().EQUALSIGN,encodeURIComponent(this.RedirectUriSignIn),this.getCognitoConstants().AMPERSAND,this.getCognitoConstants().DOMAIN_QUERY_PARAM_RESPONSE_TYPE,this.getCognitoConstants().EQUALSIGN,this.responseType,this.getCognitoConstants().AMPERSAND,this.getCognitoConstants().CLIENT_ID,this.getCognitoConstants().EQUALSIGN,this.getClientId(),this.getCognitoConstants().AMPERSAND,this.getCognitoConstants().STATE,this.getCognitoConstants().EQUALSIGN,this.state,this.getCognitoConstants().AMPERSAND,this.getCognitoConstants().SCOPE,this.getCognitoConstants().EQUALSIGN,e,t,n)},t.prototype.signOut=function(){var t=this.getFQDNSignOut();this.signInUserSession=null,this.clearCachedTokensScopes(),this.launchUri(t)},t.prototype.getFQDNSignOut=function(){return this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH,this.getAppWebDomain(),this.getCognitoConstants().SLASH,this.getCognitoConstants().DOMAIN_PATH_SIGNOUT,this.getCognitoConstants().QUESTIONMARK,this.getCognitoConstants().DOMAIN_QUERY_PARAM_SIGNOUT_URI,this.getCognitoConstants().EQUALSIGN,encodeURIComponent(this.RedirectUriSignOut),this.getCognitoConstants().AMPERSAND,this.getCognitoConstants().CLIENT_ID,this.getCognitoConstants().EQUALSIGN,this.getClientId())},t.prototype.getUserContextData=function(){if("undefined"!=typeof AmazonCognitoAdvancedSecurityData){var t="";this.username&&(t=this.username);var e="";return this.userpoolId&&(e=this.userpoolId),this.advancedSecurityDataCollectionFlag?AmazonCognitoAdvancedSecurityData.getData(t,e,this.clientId):void 0}},t.prototype.isUserSignedIn=function(){return null!=this.getCachedSession()&&this.getCachedSession().isValid()||null!=this.signInUserSession&&this.signInUserSession.isValid()},t}();
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var C=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],T=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}t.prototype.getNowString=function(){var t=new Date,e=T[t.getUTCDay()],n=C[t.getUTCMonth()],s=t.getUTCDate(),o=t.getUTCHours();o<10&&(o="0"+o);var i=t.getUTCMinutes();i<10&&(i="0"+i);var r=t.getUTCSeconds();return r<10&&(r="0"+r),e+" "+n+" "+s+" "+o+":"+i+":"+r+" UTC "+t.getUTCFullYear()}})(),n(2),n(1);console.log("main 0.2");const l=t=>{console.log("signin SUCCESS",t)},I=t=>{console.error("signin ERROR",t)};(()=>{const t=(()=>new S({ClientId:"7ra42ecc2c3vgmvq4sel1j8hns",AppWebDomain:"apple-turnover.auth.us-east-1.amazoncognito.com",TokenScopesArray:["phone","email","profile","openid","aws.cognito.signin.user.admin"],RedirectUriSignIn:"https://d1ebj83u34dou6.cloudfront.net/",RedirectUriSignOut:"https://d1ebj83u34dou6.cloudfront.net/signout/",UserPoolId:"us-east-1_FxcXhUibI"}))(),{href:e}=window.location,n=document.getElementById("signin-nav-button"),s=document.getElementById("signout-nav-button"),o=document.getElementById("signin-main-button");t.userhandler={onSuccess:l,onFailure:I},t.parseCognitoWebResponse(e);const i=t.isUserSignedIn();console.log("is signed in",i),console.log("current user",t.getCurrentUser()),[n,o].forEach(e=>{e.addEventListener("click",()=>{console.log("get session"),i||t.getSession()})}),s.addEventListener("click",()=>{console.log("signout"),i&&t.signOut()}),i?console.log("Already signed in"):console.log("Not signed in"),console.log("auth",t)})()},function(t,e){console.log("bar")},function(t,e){console.log("foo")}]);