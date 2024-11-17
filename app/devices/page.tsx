import { useEffect, useState } from "react";

interface Device {
  deviceId: string;
  deviceName: string;
}

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api/devices", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // ログイン時に保存したトークン
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch devices: ${response.status}`);
        }

        const data: Device[] = await response.json();
        setDevices(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceControl = async (deviceId: string, command: string) => {
    try {
      const response = await fetch(`/api/devices/${deviceId}/control`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send command");
      }

      alert("Command sent successfully");
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  if (loading) return <div>Loading devices...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Devices</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>
            {device.deviceName}
            <button
              onClick={() => handleDeviceControl(device.deviceId, "turnOn")}
            >
              Turn On
            </button>
            <button
              onClick={() => handleDeviceControl(device.deviceId, "turnOff")}
            >
              Turn Off
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevicesPage;