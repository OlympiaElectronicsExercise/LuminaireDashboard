import React from "react";
import {
    LuminaireModel,
    DBLuminaireModel,
} from "../../interfaces/Luminaire.ts";
import { Link } from "react-router-dom";
import {
    getLuminaireStatus,
    moreThanAnHourAgo,
    adjustToLocalTime,
    formatTimeDifference,
} from "../../logic/operational-status.ts";

type props = {
    item: DBLuminaireModel;
};

const SingleDevice = ({ item }: props) => {
    const bgColors = {
        Online: "bg-green-500",
        Faulty: "bg-red-500",
        Offline: "bg-gray-500",
    };

    const shadow = {
        Online: "hover:shadow-green-800/50",
        Faulty: "hover:shadow-red-800/50",
        Offline: "hover:shadow-gray-800/50",
    };

    const status = getLuminaireStatus(item);

    return (
        <Link
            to={{
                pathname: `/device/${item.uid}`,
            }}
            className={`bg-slate-800 p-4 rounded-lg m-2 w-80 cursor-pointer shadow-md hover:shadow-lg ${shadow[status]} transition-shadow duration-200`}
            key={item.uid}
        >
            <div className="flex row justify-between items-center">
                <h2 className="text-xl font-bold text-white mb-2">
                    Device #{item.uid}
                </h2>
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
            <p className="text-white font-mono m-2  ">
                Address:{" "}
                <span className="p-1 bg-gray-900 rounded">{item.address}</span>
            </p>
            <p className="text-white font-mono m-2  ">
                Last Update:{" "}
                <span className="p-1 bg-gray-900 rounded">
                    {formatTimeDifference(item.updateOn)}
                </span>
            </p>
            <p
                className={`text-white ${bgColors[status]} p-1 rounded-lg font-bold text-center font-mono`}
            >
                {status}
            </p>
            {/* Add more content here */}
        </Link>
    );
};

export default SingleDevice;
