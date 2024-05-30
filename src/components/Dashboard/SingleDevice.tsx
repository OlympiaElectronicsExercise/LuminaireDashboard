import React from 'react';
import DeviceStatus from '../../interfaces/DeviceStatus';


const SingleDevice: React.FC<DeviceStatus> = (status) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-2">Single Device</h2>
      <p className='text-white'>Address: {status.Address}</p>
      <p className='text-white'>Autonomy: {status.Autonomy}</p>
      {/* Add more content here */}
    </div>
  );
};

export default SingleDevice;