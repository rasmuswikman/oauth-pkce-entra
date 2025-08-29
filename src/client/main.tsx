import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import App from './App.tsx';

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_AUDIENCE,
  authorizationEndpoint: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT}/oauth2/v2.0/token`,
  redirectUri: import.meta.env.VITE_HOST + '/',
  scope: 'User.Read email profile openid',
  onRefreshTokenExpire: (event) =>
    window.confirm('Tokens have expired. Refresh page to continue using the site?') && event.logIn(),
  autoLogin: false,
  decodeToken: false,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider authConfig={authConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);
