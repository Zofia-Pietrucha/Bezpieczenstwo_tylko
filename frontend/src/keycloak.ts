// import Keycloak from "keycloak-js";

// const keycloak = new Keycloak({
//   url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
//   realm: process.env.REACT_APP_KEYCLOAK_REALM || "security-realm",
//   clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "security-frontend",
// });

// export default keycloak;

import Keycloak from "keycloak-js";

// Użyj window dla zmiennych środowiskowych w React
const keycloak = new Keycloak({
  url: (window as any).env?.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
  realm: (window as any).env?.REACT_APP_KEYCLOAK_REALM || "security-realm",
  clientId:
    (window as any).env?.REACT_APP_KEYCLOAK_CLIENT_ID || "security-frontend",
});

export default keycloak;
