import React, { useEffect, useContext } from "react";
import { DeviceContext } from "../../context/device-context.tsx";
import { useParams } from "react-router-dom";
import { getLuminaireStatus } from "../../logic/operational-status.ts";

function SingleDevicePage() {
    const { luminaires } = useContext(DeviceContext);
    const params = useParams();
    const deviceId = params.deviceId;
    const luminaire = luminaires.find(
        (device) => device.uid === parseInt(deviceId as string)
    );

    if (!luminaire) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <h1 className="text-white text-2xl">Device not found</h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center bg-slate-900 p-10">
            {/* <ul>
        {Object.entries(luminaire).map(([key, value]) => (
          <li key={key} className="text-white">{key}: {value}</li>
        ))}
      </ul> */}
            <table className="table-auto border-collapse border border-slate-500 rounded">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <h1 className="border font-bold border-slate-600 bg-slate-700 text-white px-4 py-2">
                                Device #{luminaire.uid}
                            </h1>
                        </th>
                    </tr>
                    <tr>
                        <th className="border border-slate-600 bg-slate-700 text-white px-4 py-2">
                            Property
                        </th>
                        <th className="border border-slate-600 bg-slate-700 text-white px-4 py-2">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-700 text-white px-4 py-2">
                            Device State
                        </td>
                        <td className="border border-slate-700 text-white px-4 py-2">
                            {getLuminaireStatus(luminaire)}
                        </td>
                    </tr>
                    {Object.entries(luminaire).map(([key, value]) => (
                        <tr key={key}>
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
