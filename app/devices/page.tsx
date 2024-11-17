'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDevices, controlDevice } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function DevicesPage() {
	useAuth(); // ログインしていない場合はリダイレクト

  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch devices');
      }
    };
    fetchDevices();
  }, []);

  const handleControl = async (id: string, command: string) => {
    try {
      await controlDevice(id, command);
      alert('Command sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send command');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1>Devices</h1>
      <button onClick={() => router.push('/account')}>Account Settings</button>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name}
            <button onClick={() => handleControl(device.id, 'turnOn')}>
              Turn On
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}