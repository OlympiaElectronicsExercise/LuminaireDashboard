type LuminareModel = {
    uid: number;
    address: number;
    maintained: number;
    batteryCharging: number;
    batteryTestRunning: number;
    lampTestRunning: number;
    batteryCapacityFault: number;
    lampFault: number;
    chargerFault: number;
    mainsFault: number;
    batteryVoltage: string;
    chargeCurrent: string;
    lampCurrent: string;
    autonomy: string;
    version: string;
    luminaryModel: string;
    batteryFault: number;
    batteryCutOffStatus: number;
    spiCommError: number;
    resolvedSpiCommError: number;
    moduleVersion: string;
    moduleType: number;
    timeToSend: string;
    hasWrongLuminaireType: number;
    fullyCharged: number;
    rfchannel: number;
    lampTestMade: number;
    dimmingLevel: string;
    zone: number;
    sidToGo: number;
    networkidToGo: number;
    rfchannelToGo: number;
    inForcedEmergency: number;
    rssi: number;
    rssiWithUnit: string;
    networkLevel: number;
    hopCounter: number;
    messageCounter: number;
    latencyCounter: number;
    rc1181fwVersion: string;
    createdOn: Date;
    updateOn: Date;
};

const API_URL = "http://localhost:5100/api/v1";

async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

async function register(email: string, password: string) {
    const response = await fetch(`${API_URL}/Auth/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

async function forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/Auth/forgot-password`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
}

async function resetPassword(token: string, newPassword: string) {
    const response = await fetch(`${API_URL}/Auth/reset-password`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
    });
    return response.json();
}

async function getLuminaires() {
    const response = await fetch(`${API_URL}/Luminaire`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

async function getLuminaire(uid: number) {
    const response = await fetch(`${API_URL}/Luminaire/${uid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

async function createLuminaire(luminareModel: LuminareModel) {
    const response = await fetch(`${API_URL}/Luminaire`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(luminareModel),
    });
    return response.json();
}

async function deleteLuminaire(uid: number) {
    const response = await fetch(`${API_URL}/Luminaire/${uid}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

export {
    login,
    register,
    forgotPassword,
    resetPassword,
    getLuminaires,
    getLuminaire,
    createLuminaire,
    deleteLuminaire,
    LuminareModel,
};
