export const AUTH_TOKEN_KEY = 'nauvus-pte-jwtToken';
export const PUBLIC_URL = process.env.PUBLIC_URL;

export const SERVER_API_URL = process.env.SERVER_API_URL;

export const COGNITO_REGION= process.env.COGNITO_REGION;
export const COGNITO_USER_POOL_ID= process.env.COGNITO_USER_POOL_ID;
export const COGNITO_WEB_CLIENT_ID= process.env.COGNITO_WEB_CLIENT_ID;
export const COGNITO_AUTH_FLOW_TYPE= process.env.COGNITO_AUTH_FLOW_TYPE;
export const GOOGLE_MAP_API_KEY= process.env.GOOGLE_MAP_API_KEY;


export const VERSION = "0.1.build2";

export const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export const APP_TIMESTAMP_FORMAT_TEXT = 'DD MMM /YYYY';

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm:ss';

// Cognito
export const COGNOTO_SERVER_URL = process.env.COGNOTO_SERVER_URL;
export const COGNOTO_CLIENT_ID = process.env.COGNOTO_CLIENT_ID;
export const COGNOTO_RESPONSE_TYPE = process.env.COGNOTO_RESPONSE_TYPE;

export const STEP_SIGN_UP = {
    CHOOSE_COUNTRY: 'CHOOSE_COUNTRY',
    REGISTER: 'REGISTER',
    CONFIRMATION: 'CONFIRMATION',
    ACTIVE_DEVICE: 'ACTIVE_DEVICE',
    COMPLETED: 'COMPLETED'
};

export const STEP_RECOVER_PASSWORD = {
    REQUEST: 'REQUEST',
    CONFIRMATION_SENT: 'CONFIRMATION_SENT',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    COMPLETED: 'COMPLETED'
};