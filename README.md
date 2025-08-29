# OAuth with PKCE and Microsoft Entra ID

This is a small [Vite Express](https://github.com/szymmis/vite-express) application to verify OAuth with PKCE and Microsoft Entra ID. 

[Demo](https://oauth-pkce-entra.onrender.com) on [Render](https://render.com).


### Features

- [x] [Microsoft Entra ID](https://entra.microsoft.com)
- [x] [Browser-only React client login with OAuth2 PKCE](https://github.com/soofstad/react-oauth2-pkce)
- [x] [Express.js API route protection with JWT bearer token](https://github.com/auth0/node-oauth2-jwt-bearer)
- [x] [CORS](https://github.com/expressjs/cors) and [Helmet](https://github.com/helmetjs/helmet)


### Configuring Microsoft Entra ID

1. Go to https://entra.microsoft.com
2. Select App registrations > New registration
34. Enter a name and account type (for example "Personal Microsoft accounts only")
4. Select type "Single-page application SPA" and add a redirect URI (http://localhost:5173)
5. Register
6. Copy "Application (client) ID" and "Directory (tenant) ID" to `.env` (note that tenant should be "consumers" if "Personal Microsoft accounts only" is used)


### Developing

```
npm i
npm run dev
```

Open http://localhost:5173 in your browser.
