import React, { useEffect } from "react";
import SingleDevice from "./SingleDevice.tsx";
import {
    DBLuminaireModel,
    LuminaireModel,
} from "../../interfaces/Luminaire.ts";
import { mockLuminaires } from "../../mock-data/mockLuminaires.ts";
import { DeviceContext } from "../../context/device-context.tsx";
import { CounterTypeEnum } from "../../interfaces/Counter.ts";
import Counter from "./Counter.tsx";
import { createLuminaire, getLuminaires } from "../../util/api.ts";

function Dashboard() {
    //useState to contain luminaireModels

    const [loading, setLoading] = React.useState(true);
    const { luminaires, setLuminaires } = React.useContext(DeviceContext);

    useEffect(() => {
        // Fetch data from the API, then update the context
        setLoading(false);
    }, []);

    // use react suspense to handle loading state

    const populateDevices = async () => {
        // Create a new device and add it to the context
        try {
            for (const luminaire of mockLuminaires) {
                const response = await createLuminaire(luminaire);
                console.log(`Created luminaire`);
            }
            const response = await getLuminaires();
            console.log("Response:", response);
            if (response.length === 0) {
                console.error("No devices found");
                return;
            }
            setLuminaires(response);
        } catch (error) {
            console.error("Error:", JSON.stringify(error));
        }
    };

    const getDevices = async () => {
        try {
            const response = await getLuminaires();
            console.log("Response:", response);
            if (response.length === 0) {
                console.error("No devices found");
                return;
            }
            setLuminaires(response);
        } catch (error) {
            console.error("Error:", JSON.stringify(error));
        }
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="h-screen flex-col gap-5 flex items-center justify-center   bg-slate-900">
            <section className="grid grid-cols-3 gap-4">
                <Counter type={CounterTypeEnum.Online} />
                <Counter type={CounterTypeEnum.Faults} />
                <Counter type={CounterTypeEnum.Offline} />
            </section>
            <h1 className="text-4xl text-white font-bold">
                <span>{luminaires.length || ""}</span> Devices
            </h1>
            <section className="grid grid-cols-3 gap-4">
                {luminaires.map((item) => (
                    <SingleDevice item={item} key={item.uid} />
                ))}
            </section>
            <section className="flex gap-4">
                {/* a button for populating the api with devices */}
                <button
                    onClick={getDevices}
                    className="text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {" "}
                    Get Devices{" "}
                </button>
                <button
                    onClick={populateDevices}
                    className="text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {" "}
                    Populate Devices
                </button>
            </section>
        </div>
    );
}

export default Dashboard;
