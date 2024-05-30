import React, { useEffect } from 'react';
import SingleDevice from './SingleDevice.tsx';
import DeviceStatus from '../../interfaces/DeviceStatus';
import { mockDeviceStatus } from "../../mock-data/mockDeviceStatus.ts"

function Dashboard() {
    const [devices, setDevices] = React.useState(mockDeviceStatus);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        // Fetch data from API
        // setDevices(response.data);
        setLoading(false);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <section></section>
            <section className='grid grid-cols-3 gap-4'>{devices.map((item: DeviceStatus) =>
                <SingleDevice {...item} />
            )}</section>
        </div>
    );
}

export default Dashboard;
