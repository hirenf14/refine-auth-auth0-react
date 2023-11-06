import { useAuth0 } from "@auth0/auth0-react";

import { AuthBindings } from "@refinedev/core";
import { useState } from "react";

export interface AuthProviderHookResult {
  authProvider: AuthBindings;
  token?: string;
  isLoading: boolean;
}
export const useAuthProvider = (): AuthProviderHookResult => {
  const { isLoading, user, logout, loginWithRedirect, getIdTokenClaims } =
  useAuth0();
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const authProvider = {
    login: async () => {
      await loginWithRedirect();
      return {
        success: true,
      };
    },
    logout: async () => {
      await logout();
      setAuthToken(undefined);
      return {
        success: true,
      };
    },
    onError: async (error: any) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          setAuthToken(token.__raw);
          return {
            authenticated: true,
          };
        } else {
          setAuthToken(undefined);
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };
  return {
    authProvider,
    isLoading,
    token: authToken,
  };
};
