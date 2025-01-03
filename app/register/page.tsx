'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [switchbotToken, setSwitchbotToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUser(email, password, switchbotToken);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Switchbot Token"
        value={switchbotToken}
        onChange={(e) => setSwitchbotToken(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}