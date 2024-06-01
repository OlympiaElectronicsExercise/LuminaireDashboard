import DeviceStatus from '../interfaces/DeviceStatus';

const deviceIsOnline = (device: DeviceStatus): boolean => {
    return device.BatteryTestRunning;
};

const deviceIsFaulty = (device: DeviceStatus): boolean => {
    return device.LampFault;
};

const deviceIsOffline = (device: DeviceStatus): boolean => {
    return !device.BatteryTestRunning && !device.LampFault;
};

export { deviceIsOnline, deviceIsFaulty, deviceIsOffline };
