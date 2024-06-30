import React, { useEffect, useContext } from "react";
import { DeviceContext } from "../../context/device-context.tsx";
import { Link, useParams } from "react-router-dom";
import { getLuminaireStatus } from "../../logic/operational-status.ts";

function SingleDevicePage() {
    const { luminaires } = useContext(DeviceContext);
    const params = useParams();
    const deviceId = params.deviceId;
    const luminaire = luminaires.find(
        (device) => device.uid === parseInt(deviceId as string)
    );

    const statusColor = {
        Online: "bg-green-500",
        Faulty: "bg-red-500",
        Offline: "bg-gray-500",
    };

    if (!luminaire) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <h1 className="text-white text-2xl">Device not found</h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center text-white  bg-slate-900 p-10">
            <Link
                to="/dashboard"
                className={
                    "absolute top-5 left-5 bg-slate-700 p-4 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-800 cursor-pointer "
                }
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform rotate-180"
                >
                    <path
                        d="M5 12H19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 5L19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="font-bold font-mono">Go To Dashboard</p>
            </Link>
            <table className="table-auto px-10 rounded-lg border-blue-900 bg-slate-900 shadow-md overflow-hidden">
                <thead className=" bg-blue-900  text-white">
                    <tr className="border-b border-b-blue-600">
                        <th colSpan={2}>
                            <h1 className=" text-2xl font-bold  text-white px-4 py-2">
                                Device #{luminaire.uid}
                            </h1>
                        </th>
                    </tr>
                    <tr>
                        <th className="  text-white px-4 py-2">Property</th>
                        <th className="  text-white px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody className="rounded-lg">
                    <tr>
                        <td className="border border-slate-700 text-white px-4 py-2">
                            Device State
                        </td>
                        <td
                            className={`border ${
                                statusColor[getLuminaireStatus(luminaire)]
                            } border-slate-700 text-white px-4 py-2 font-bold text-center font-mono text-lg`}
                        >
                            {getLuminaireStatus(luminaire)}
                        </td>
                    </tr>
                    {Object.entries(luminaire).map(([key, value]) => (
                        <tr key={key} className="font-mono">
                            <td className="border border-slate-700 text-white px-4 py-2">
                                {key}
                            </td>
                            <td className="border border-slate-700 text-white px-4 py-2">
                                {JSON.stringify(value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SingleDevicePage;
