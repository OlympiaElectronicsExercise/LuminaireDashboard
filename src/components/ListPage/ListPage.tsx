import React, { useEffect, useContext } from "react";
import { DeviceContext } from "../../context/device-context.tsx";
import { useParams } from "react-router-dom";
import { getLuminaireStatus } from "../../logic/operational-status.ts";

function SingleDevicePage() {
    const { luminaires } = useContext(DeviceContext);
    const params = useParams();
    const deviceState = params.type;

    const matchState = {
        "online-devices": "online",
        "faulty-devices": "faulty",
        "offline-devices": "offline",
    };

    const matchBgColor = {
        online: "bg-green-500",
        faulty: "bg-red-500",
        offline: "bg-gray-500",
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
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <h1 className="text-white text-2xl">Devices not found</h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center bg-slate-900 p-10 h-full">
            <h1 className="p-3">{getLuminaireStatus(luminairesState[0])}</h1>
            <table className="min-w-full table-auto rounded-lg bg-white shadow-md overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {luminairesState.map((luminaire) => (
                        <tr
                            key={luminaire.uid}
                            className="bg-gray-100 border-b"
                        >
                            <td className="px-4 py-2 text-center">
                                {luminaire.uid}
                            </td>
                            <td className="px-4 py-2 text-center">
                                {luminaire.address}
                            </td>
                            <td className="px-4 py-2 text-center">
                                {getLuminaireStatus(luminaire)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SingleDevicePage;
