import Amplify, { Auth } from 'aws-amplify';

import { COGNITO_REGION, COGNITO_USER_POOL_ID, COGNITO_WEB_CLIENT_ID, COGNITO_AUTH_FLOW_TYPE } from "config/constants";

const awsconfig = () => {
    return {
        Auth: {
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      
            // REQUIRED - Amazon Cognito Region
            region: COGNITO_REGION,
      
            // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
            // Required only if it's different from Amazon Cognito Region
            identityPoolRegion: COGNITO_REGION,
      
            // OPTIONAL - Amazon Cognito User Pool ID

            userPoolId: COGNITO_USER_POOL_ID,
      
            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: COGNITO_WEB_CLIENT_ID,
        
            // userPoolWebClientId: '6kfurrqakg8c2cn6ojcph2bo16',
      
            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: false,
      
            // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            authenticationFlowType: COGNITO_AUTH_FLOW_TYPE,
        }
    };
}

export default awsconfig;
