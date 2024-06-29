import { LuminareModel } from "../interfaces/Luminaire";

export type LuminaireStatus = "Online" | "Offline" | "Faulty";

export const getLuminaireStatus = (
    luminare: LuminareModel
): LuminaireStatus => {
    const {
        batteryCapacityFault,
        lampFault,
        chargerFault,
        mainsFault,
        batteryFault,
        batteryCutOffStatus,
        spiCommError,
        inForcedEmergency,
        rssi,
    } = luminare;

    // Condition for 'Offline'
    // Assuming Rssi value is used to determine the connectivity status. If it's 0 or -100 dBm, the device is considered offline.
    if (rssi === 0 || rssi <= -100) {
        return "Offline";
    }

    // Condition for 'Faulty'
    if (
        batteryCapacityFault ||
        lampFault ||
        chargerFault ||
        mainsFault ||
        batteryFault ||
        batteryCutOffStatus ||
        spiCommError ||
        inForcedEmergency
    ) {
        return "Faulty";
    }

    // Condition for 'Online'
    return "Online";
};

export const deviceIsOnline = (luminare: LuminareModel): boolean => {
    return getLuminaireStatus(luminare) === "Online";
};

export const deviceIsOffline = (luminare: LuminareModel): boolean => {
    return getLuminaireStatus(luminare) === "Offline";
};

export const deviceIsFaulty = (luminare: LuminareModel): boolean => {
    return getLuminaireStatus(luminare) === "Faulty";
};
