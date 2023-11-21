import { Auth0Provider } from "@auth0/auth0-react";
export {
  useAuthProvider,
  type AuthProviderHookResult,
} from "./hooks/useAuthProvider";

export const RefineAuth0Provider = Auth0Provider;
export default RefineAuth0Provider;