import React, { useEffect, useContext } from 'react';
import DeviceStatus from '../../interfaces/DeviceStatus';
import { mockDeviceStatus } from "../../mock-data/mockDeviceStatus.ts"
import { DeviceContext } from '../../context/device-context.tsx';
import { useParams } from 'react-router-dom';

function SingleDevicePage() {
  const { devicesStatus } = useContext(DeviceContext);
  const params = useParams();
  const deviceId = params.deviceId;
  const status = devicesStatus.find((device) => device.Address === deviceId)

  if (!status) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-white text-2xl">Device not found</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-slate-900">
      <ul>
        {Object.entries(status).map(([key, value]) => (
          <li key={key} className="text-white">{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default SingleDevicePage;
