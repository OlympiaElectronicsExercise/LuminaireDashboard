import React, { createContext, useState, ReactNode } from 'react';
import DeviceStatus from '../interfaces/DeviceStatus';
import { deviceIsFaulty, deviceIsOffline, deviceIsOnline } from '../logic/operational-status.ts';


type DeviceContextType = {
  devicesStatus: DeviceStatus[];
  setDevicesStatus: (devicesStatus: DeviceStatus[]) => void;
  onlineDevices: DeviceStatus[];
  faultyDevices: DeviceStatus[];
  offlineDevices: DeviceStatus[];
};
// Create the context
export const DeviceContext = createContext<DeviceContextType>(
  {
    devicesStatus: [],
    setDevicesStatus: () => { },
    onlineDevices: [],
    faultyDevices: [],
    offlineDevices: [],
  }
);

// Create a provider component
export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define the state for DeviceStatus[]
  const [devicesStatus, setDevicesStatus] = useState<DeviceStatus[]>([]);
  const onlineDevices = devicesStatus.filter((device) => deviceIsOnline(device));
  const faultyDevices = devicesStatus.filter((device) => deviceIsFaulty(device));
  const offlineDevices = devicesStatus.filter((device) => deviceIsOffline(device));

  return (
    <DeviceContext.Provider value={
      {
        devicesStatus,
        setDevicesStatus,
        onlineDevices,
        faultyDevices,
        offlineDevices
      }

    }>
      {children}
    </DeviceContext.Provider>
  );
};