import React from 'react';
import DeviceStatus from '../../interfaces/DeviceStatus';
import { Link } from 'react-router-dom';
import { deviceIsFaulty, deviceIsOffline, deviceIsOnline } from '../../logic/operational-status.ts';


const SingleDevice: React.FC<DeviceStatus> = (status) => {
  const bgColors = {
    "online-devices": "border-green-500",
    "faulty-devices": "border-red-500",
    "offline-devices": "border-gray-500",
  };

  return (
    <Link to={{
      pathname: `/Device/${status.Address}`,
    }} className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-2">Your device</h2>
      <p className='text-white'>id: {status.Id}</p>
      <p className='text-white'>Autonomy: {status.Autonomy}</p>
      <p className='text-white'>Address: {status.Address}</p>
      {deviceIsOnline(status) && <p className='text-white bg-green-500 p-1 rounded-lg'>Online</p>}
      {deviceIsFaulty(status) && <p className='text-white bg-red-500 p-1 rounded-lg'>Faulty</p>}
      {deviceIsOffline(status) && <p className='text-white bg-gray-500 p-1 rounded-lg'>Offline</p>}
      {/* Add more content here */}
    </Link>
  );
};

export default SingleDevice;