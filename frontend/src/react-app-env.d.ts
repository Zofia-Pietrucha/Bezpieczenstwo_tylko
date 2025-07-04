/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_KEYCLOAK_URL: string;
    REACT_APP_KEYCLOAK_REALM: string;
    REACT_APP_KEYCLOAK_CLIENT_ID: string;
    REACT_APP_API_URL: string;
  }
}
