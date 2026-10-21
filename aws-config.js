// aws-config.js — AWS Configuration for Road2Masters
// Connected to your live AWS Serverless Backend!

export const AWS_CONFIG = {
  // Region where your CloudFormation backend stack is deployed
  region: "us-east-1",

  // Your live API Gateway base URL from CloudFormation Outputs
  apiBase: "https://ct99ctbi83.execute-api.us-east-1.amazonaws.com",

  // Optional: Cognito User Pool App Client ID
  userPoolClientId: ""
};
