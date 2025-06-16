import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "security-realm",
  clientId: "security-frontend",
});

export default keycloak;
