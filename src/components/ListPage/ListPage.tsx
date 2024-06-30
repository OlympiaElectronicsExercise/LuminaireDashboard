import React, { useEffect, useContext } from "react";
import { DeviceContext } from "../../context/device-context.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLuminaireStatus } from "../../logic/operational-status.ts";
import {
    DBLuminaireModel,
    LuminaireModel,
} from "../../interfaces/Luminaire.ts";

function SingleDevicePage() {
    const { luminaires } = useContext(DeviceContext);
    const params = useParams();
    const deviceState = params.type;
    const navigate = useNavigate();
    const matchState = {
        "online-devices": "online",
        "faulty-devices": "faulty",
        "offline-devices": "offline",
    };

    const decideFault = (luminaire: DBLuminaireModel) => {
        const possibleFaults = [
            "batteryCapacityFault",
            "lampFault",
            "chargerFault",
            "mainsFault",
            "batteryFault",
            "batteryCutOffStatus",
            "spiCommError",
            "inForcedEmergency",
        ];

        const faults = possibleFaults.filter((fault) => luminaire[fault] === 1);
        if (luminaire.rssi < -80) {
            faults.push("rssi");
        }

        return faults;
    };

    const matchBgColor = {
        Online: "bg-green-500",
        Faulty: "bg-red-500",
        Offline: "bg-gray-500",
    };

    console.log(matchState[deviceState as string]);
    const luminairesState = luminaires.filter(
        (device) =>
            getLuminaireStatus(device).toLowerCase() ===
            matchState[deviceState as string]
    );

    console.log(luminairesState);

    if (!luminairesState.length) {
        return (
            <div className="h-screen flex items-center justify-center text-white bg-slate-900">
                <Link
                    to="/dashboard"
                    className={
                        "absolute top-20 left-5 bg-slate-700 p-4 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-800 cursor-pointer "
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
                <h1 className="text-white text-2xl">Devices not found</h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-start flex-col text-white bg-slate-900 p-10 h-screen">
            <h1 className="p-3 text-3xl font-mono font-bold">
                {getLuminaireStatus(luminairesState[0])} Devices
            </h1>
            <Link
                to="/dashboard"
                className={
                    "absolute top-20 left-5 bg-slate-700 p-4 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-800 cursor-pointer "
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
            <table className="min-w-full table-auto rounded-lg bg-blue-900 border-blue-900 border text-white shadow-md overflow-hidden">
                <thead className="">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Status</th>
                        {getLuminaireStatus(luminairesState[0]) ===
                            "Faulty" && (
                            <th className="px-4 py-2">Fault Reason</th>
                        )}
                    </tr>
                </thead>
                <tbody className="relative">
                    {luminairesState.map((luminaire) => (
                        <>
                            <tr
                                key={luminaire.uid}
                                className="bg-slate-900 hover:bg-gray-900/50 cursor-pointer border-b-blue-900 border-b"
                                onClick={() =>
                                    navigate(`/device/${luminaire.uid}`)
                                }
                            >
                                <td className="px-4 py-3 text-center">
                                    {luminaire.uid}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {luminaire.address}
                                </td>
                                <td className={"px-4 py-2 text-center"}>
                                    <div className="absolute right-5">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                    </div>
                                    <span
                                        className={`rounded p-1 font-bold font-mono ${
                                            matchBgColor[
                                                getLuminaireStatus(luminaire)
                                            ]
                                        }`}
                                    >
                                        {getLuminaireStatus(luminaire)}
                                    </span>
                                </td>
                                {getLuminaireStatus(luminairesState[0]) ===
                                    "Faulty" && (
                                    <td className={"px-4 py-2 text-center"}>
                                        {decideFault(luminaire).map((item) => {
                                            return (
                                                <span className="p-1 m-1 bg-slate-800 rounded-lg font-mono">
                                                    {item}
                                                </span>
                                            );
                                        })}
                                    </td>
                                )}
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SingleDevicePage;
