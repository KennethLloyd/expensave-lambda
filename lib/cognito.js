const AWS = require('aws-sdk');
const jwtDecode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const cognitoAttributeList = [];

const poolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};

const attributes = (key, value) => {
  return {
    Name: key,
    Value: value,
  };
};

const setCognitoAttributeList = (email, agent) => {
  const attributeList = [];
  attributeList.push(attributes('email', email));
  attributeList.forEach((element) => {
    cognitoAttributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(element),
    );
  });
};

const getCognitoAttributeList = () => cognitoAttributeList;

const getCognitoUser = (email) => {
  const userData = {
    Username: email,
    Pool: getUserPool(),
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
};

const getUserPool = () => new AmazonCognitoIdentity.CognitoUserPool(poolData);

const getAuthDetails = (email, password) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
};

const initAWS = (
  region = process.env.MY_AWS_REGION,
  identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID,
) => {
  AWS.config.region = region; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  });
};

const decodeJWTToken = (token) => {
  // eslint-disable-next-line camelcase
  const { email, exp, auth_time, token_use, sub } = jwtDecode(token.idToken);
  return { token, email, exp, uid: sub, auth_time, token_use };
};

const signUp = (email, password, agent = 'none') =>
  new Promise((resolve, reject) => {
    initAWS();
    setCognitoAttributeList(email, agent);
    getUserPool().signUp(
      email,
      password,
      getCognitoAttributeList(),
      null,
      (err, result) => {
        if (err) {
          const error = new Error(err.message);
          error.status = 400;
          reject(error);
        } else {
          const response = {
            username: result.user.username,
            userConfirmed: result.userConfirmed,
            userAgent: result.user.client.userAgent,
          };
          resolve(response);
        }
      },
    );
  });

const verify = (email, code) =>
  new Promise((resolve, reject) => {
    getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });

const signIn = (email, password) =>
  new Promise((resolve, reject) => {
    getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        };
        resolve(decodeJWTToken(token));
      },

      onFailure: (err) => {
        const error = new Error(err.message);
        error.status = 400;
        reject(error);
      },
    });
  });

module.exports = {
  signUp,
  verify,
  signIn,
};
