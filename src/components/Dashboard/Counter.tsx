import React, { useContext } from "react";
import DeviceStatus from "../../interfaces/Luminaire.ts";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../context/device-context.tsx";
import { CounterTypeEnum } from "../../interfaces/Counter";

type CounterProps = {
    type: "online-devices" | "faulty-devices" | "offline-devices";
};

const Counter: React.FC<CounterProps> = ({ type }) => {
    const context = useContext(DeviceContext);

    const deviceTypeMap = {
        "online-devices": context.onlineDevices,
        "faulty-devices": context.faultyDevices,
        "offline-devices": context.offlineDevices,
    };

    const bgColors = {
        "online-devices": "border-green-500",
        "faulty-devices": "border-red-500",
        "offline-devices": "border-gray-500",
    };

    return (
        <Link
            to={{
                pathname: `/list/${type}`,
            }}
            className={`bg-slate-800 ${bgColors[type]} border p-4 rounded-lg font-mono`}
        >
            <h2 className="text-xl font-bold text-white mb-2">
                There are{" "}
                <span className="px-1 rounded-md bg-slate-900">
                    {deviceTypeMap[type].length}
                </span>{" "}
                {type.replace("-", " ")}
            </h2>
            <p className="text-white">click to see</p>
        </Link>
    );
};

export default Counter;
