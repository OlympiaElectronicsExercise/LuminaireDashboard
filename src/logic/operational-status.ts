import { LuminaireModel } from "../interfaces/Luminaire";

export type LuminaireStatus = "Online" | "Offline" | "Faulty";

export const adjustToLocalTime = (dateInUTC: Date): Date => {
    // Get the local time zone offset in millisecond
    const dateOf = new Date(dateInUTC);
    const timeZoneOffset = dateOf.getTimezoneOffset() * 60000;

    // Adjust the date to local time by subtracting the timezone offset
    return new Date(dateOf.getTime() - timeZoneOffset);
};

export const formatTimeDifference = (updateOn: Date): string => {
    const hoursAgo = moreThanAnHourAgo(updateOn);

    if (hoursAgo < 1) {
        // If less than an hour, convert to minutes
        const minutesAgo = Math.round(hoursAgo * 60);
        return `${minutesAgo} min ago`;
    } else {
        // If more than an hour, round down to nearest whole number
        const roundedHours = Math.floor(hoursAgo);
        if (roundedHours === 1) {
            return `${roundedHours} hr ago`;
        }
        return `${roundedHours} hrs ago`;
    }
};

export const moreThanAnHourAgo = (updateOn: Date): number => {
    // Assuming updateOn is a UTC timestamp string
    const dateInUTC = new Date(updateOn);

    // Get the local time zone offset in milliseconds
    const timeZoneOffset = dateInUTC.getTimezoneOffset() * 60000;

    // Adjust the date to local time by subtracting the timezone offset
    const dateInLocal = new Date(dateInUTC.getTime() - timeZoneOffset);

    const currentTime = new Date();

    const differenceInMilliseconds =
        currentTime.getTime() - dateInLocal.getTime();

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours;
};

export const getLuminaireStatus = (
    luminaire: LuminaireModel
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
        updateOn,
    } = luminaire;

    // Condition for 'Offline'
    // if its been more than an hour since it was updated then it is offline

    // Usage within your existing function
    // Add this condition to check if the device is 'Offline'
    const oneHourInMilliseconds = 60 * 60 * 1000; // 3600000 milliseconds

    if (moreThanAnHourAgo(updateOn) > 1) {
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
        inForcedEmergency ||
        rssi < -80
    ) {
        return "Faulty";
    }

    // Condition for 'Online'
    return "Online";
};

export const deviceIsOnline = (Luminaire: LuminaireModel): boolean => {
    return getLuminaireStatus(Luminaire) === "Online";
};

export const deviceIsOffline = (Luminaire: LuminaireModel): boolean => {
    return getLuminaireStatus(Luminaire) === "Offline";
};

export const deviceIsFaulty = (Luminaire: LuminaireModel): boolean => {
    return getLuminaireStatus(Luminaire) === "Faulty";
};
