'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '../../lib/api';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [switchbotToken, setSwitchbotToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateUser(email, password, switchbotToken);
      alert('Account updated!');
      router.push('/devices');
    } catch (err: any) {
      setError(err.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Switchbot Token"
        value={switchbotToken}
        onChange={(e) => setSwitchbotToken(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}