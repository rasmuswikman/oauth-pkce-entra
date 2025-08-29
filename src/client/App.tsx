import { useContext, useState } from 'react';
import { AuthContext, type IAuthContext } from 'react-oauth2-code-pkce';
import './App.css';

export default function App() {
  const { token, idToken, idTokenData, error, logIn, logOut }: IAuthContext = useContext(AuthContext);

  const [data, setData] = useState('');

  async function callApi(idToken?: string) {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    setData(result);
  }

  return (
    <main>
      {error ? (
        <div>
          <div>An error occurred during authentication: {error}</div>
          <button type="button" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      ) : token ? (
        <div>
          {idTokenData && (
            <p>
              <strong>Name:</strong> {idTokenData.name}
              <br />
              <strong>Email:</strong> {idTokenData.email}
            </p>
          )}
          <button type="button" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => logIn()}>
          Log in
        </button>
      )}
      <div>
        <button type="button" onClick={() => callApi(idToken)}>
          callApi
        </button>
      </div>
      {data && (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
