const axios = require("axios");

const getKeycloakConfig = async () => {
  try {
    const response = await axios.get(
      `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Keycloak config:", error.message);
    throw error;
  }
};

const verifyKeycloakConnection = async () => {
  try {
    await getKeycloakConfig();
    console.log("✅ Keycloak connection verified");
    return true;
  } catch (error) {
    console.error("❌ Keycloak connection failed:", error.message);
    console.log("⚠️  Continuing without Keycloak verification...");
    return false;
  }
};

module.exports = {
  getKeycloakConfig,
  verifyKeycloakConnection,
};
