import React, { useEffect } from 'react';
import SingleDevice from './SingleDevice.tsx';
import DeviceStatus from '../../interfaces/DeviceStatus';
import { mockDeviceStatus } from "../../mock-data/mockDeviceStatus.ts"
import { DeviceContext } from '../../context/device-context.tsx';
import { CounterTypeEnum } from '../../interfaces/Counter.ts';
import Counter from './Counter.tsx';


function Dashboard() {
    const [devices, setDevices] = React.useState(mockDeviceStatus);
    const [loading, setLoading] = React.useState(true);
    const { devicesStatus, setDevicesStatus } = React.useContext(DeviceContext);

    useEffect(() => {
        // Fetch data from the API, then update the context
        setDevicesStatus(mockDeviceStatus);
        setLoading(false);
    }, []);

    // use react suspense to handle loading state
    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div className="h-screen flex-col gap-5 flex items-center justify-center   bg-slate-900">
            <section className='grid grid-cols-3 gap-4'>
                <Counter type={CounterTypeEnum.Online} />
                <Counter type={CounterTypeEnum.Faults} />
                <Counter type={CounterTypeEnum.Offline} />
            </section>
            <section className='grid grid-cols-3 gap-4'>{devices.map((item: DeviceStatus) =>
                <SingleDevice {...item} />
            )}</section>
        </div>
    );
}

export default Dashboard;
