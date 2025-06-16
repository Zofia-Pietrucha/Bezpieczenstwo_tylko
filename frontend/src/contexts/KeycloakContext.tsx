import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Keycloak from "keycloak-js";
import keycloak from "../keycloak.ts";

interface KeycloakContextType {
  keycloak: Keycloak | null;
  authenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
  userInfo: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
  } | null;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined
);

interface KeycloakProviderProps {
  children: ReactNode;
}

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] =
    useState<KeycloakContextType["userInfo"]>(null);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
        });

        setAuthenticated(authenticated);

        if (authenticated) {
          // Pobierz informacje o użytkowniku
          const tokenParsed = keycloak.tokenParsed as any;
          const roles = keycloak.realmAccess?.roles || [];

          setUserInfo({
            username: tokenParsed?.preferred_username,
            email: tokenParsed?.email,
            firstName: tokenParsed?.given_name,
            lastName: tokenParsed?.family_name,
            roles: roles,
          });
        }
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  const hasRole = (role: string): boolean => {
    return keycloak.realmAccess?.roles?.includes(role) || false;
  };

  const value: KeycloakContextType = {
    keycloak,
    authenticated,
    loading,
    login,
    logout,
    hasRole,
    userInfo,
  };

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = (): KeycloakContextType => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};
