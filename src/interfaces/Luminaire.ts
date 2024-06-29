type LuminaireModel = {
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

type DBLuminaireModel = LuminaireModel & {
    uid: number;
};

export { DBLuminaireModel, LuminaireModel };
