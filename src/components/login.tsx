import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'utils/cookies';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookieLocal] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    if (cookie) {
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
  }, [cookie]);

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            console.log(e);
            setPassword(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
