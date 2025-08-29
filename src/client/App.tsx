import { useContext, useState } from 'react';
import { AuthContext, type IAuthContext } from 'react-oauth2-code-pkce';
import './App.css';

export default function App() {
  const { token, idToken, idTokenData, error, logIn, logOut }: IAuthContext =
    useContext(AuthContext);

  const [data, setData] = useState<string | null>(null);

  function handleLogout() {
    logOut();
    setData(null);
  }

  async function callApi() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();

    setData(result.response || 'No response...');
  }

  return (
    <main>
      <div>
        {error ? (
          <div>
            <div>
              <p>
                An error occurred during authentication:
                <br />
                {error}
              </p>
            </div>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : token ? (
          <div>
            {idTokenData && (
              <p>
                <strong>Name:</strong> {idTokenData.name || 'N/A'}
                <br />
                <strong>Email:</strong> {idTokenData.email || 'N/A'}
              </p>
            )}
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => logIn()}>
              Log in
            </button>
          </div>
        )}
        <hr />
        <div>
          <button type="button" onClick={() => callApi()}>
            Call API
          </button>
        </div>
        <div>
          Response:{' '}
          {data === 'Authorized' ? (
            <span className="authorized">Authorized</span>
          ) : data === 'Unauthorized' ? (
            <span className="unauthorized">Unauthorized</span>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
    </main>
  );
}
