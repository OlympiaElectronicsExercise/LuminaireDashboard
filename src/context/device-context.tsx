import React, { createContext, useState, ReactNode } from "react";
import { LuminaireModel, DBLuminaireModel } from "../interfaces/Luminaire.ts";
import {
    deviceIsFaulty,
    deviceIsOffline,
    deviceIsOnline,
} from "../logic/operational-status.ts";

type DeviceContextType = {
    luminaires: DBLuminaireModel[];
    setLuminaires: (devicesStatus: DBLuminaireModel[]) => void;
    onlineDevices: LuminaireModel[];
    faultyDevices: LuminaireModel[];
    offlineDevices: LuminaireModel[];
};
// Create the context
export const DeviceContext = createContext<DeviceContextType>({
    luminaires: [],
    setLuminaires: () => {},
    onlineDevices: [],
    faultyDevices: [],
    offlineDevices: [],
});

// Create a provider component
export const DeviceProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    // Define the state for LuminaireModel[]
    const [luminaires, setLuminaires] = useState<DBLuminaireModel[]>([]);
    const onlineDevices = luminaires.filter((device) => deviceIsOnline(device));
    const faultyDevices = luminaires.filter((device) => deviceIsFaulty(device));
    const offlineDevices = luminaires.filter((device) =>
        deviceIsOffline(device)
    );

    return (
        <DeviceContext.Provider
            value={{
                luminaires,
                setLuminaires,
                onlineDevices,
                faultyDevices,
                offlineDevices,
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
};
