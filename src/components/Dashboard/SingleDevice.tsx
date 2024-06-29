import React from "react";
import { LuminareModel } from "../../interfaces/Luminaire.ts";
import { Link } from "react-router-dom";
import { getLuminaireStatus } from "../../logic/operational-status.ts";

type props = {
    item: LuminareModel;
};

const SingleDevice = ({ item }: props) => {
    const bgColors = {
        Online: "bg-green-500",
        Faulty: "bg-red-500",
        Offline: "bg-gray-500",
    };

    const status = getLuminaireStatus(item);

    return (
        <Link
            to={{
                pathname: `/Device/${item.address}`,
            }}
            className="bg-slate-800 p-4 rounded-lg"
            key={item.uid}
        >
            <h2 className="text-xl font-bold text-white mb-2">Your device</h2>
            <p className="text-white">UID: {item.uid}</p>
            <p className="text-white">Autonomy: {item.autonomy}</p>
            <p className="text-white">Address: {item.address}</p>
            <p className={`text-white ${bgColors[status]} p-1 rounded-lg`}>
                {status}
            </p>
            {/* Add more content here */}
        </Link>
    );
};

export default SingleDevice;
