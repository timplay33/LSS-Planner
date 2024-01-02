

export type User = {
    session_id: string;
}

export interface ExtensionDictionary {
    caption: string,
    credits: number,
    coins: number,
    duration: string,
    newCells: Partial<number>,
    requiredExtensions: Partial<Array<number>>,
    isVehicleExtension: Partial<boolean>,
    givesParkingLots: Partial<number>,
    unlocksVehicleTypes: Partial<Array<number>>,
    parkingLotReservations: Partial<Array<number>>,
    cannotDisable: Partial<boolean>,
    unlockedVehiclesOnReservedLotsOnly: Partial<boolean>,

}

export interface BuildingDictionary {
        caption: string,
        color: string,
        coins: number,
        credits: number,
        levelPrices: {
            credits: Array<number>,
            coins: Array<number>,
        },
        extensions: Partial<Array<ExtensionDictionary>>,
        storageUpgrades: Partial<Object>,
        levelcost: Array<string>,
        maxBuildings: string,
        maxLevel: number,
        special: string,
        startPersonnel: number,
        startParkingLots: number,
        startVehicles: Array<string>,
        schoolingTypes: Array<string>,
        schools: Array<number>,
        icon: string,

    
}

export interface VehicleDictionary {
        caption: string,
        color: string,
        credits: number,
        coins: number,
        staff: {
            min:number,
            max: number,
            training: Partial<object>,
        },
        icon: string,
        possibleBuildings: Array<number>,
        isTrailer: Partial<boolean>,
        tractiveVehicles: Partial<number>,
        waterBonus: Partial<number>,
        special : Partial<string>,
        waterTank:Partial<number>,
        pumpCapacity: Partial<number>,
        pumpType: Partial<string>,
        minPersonnel: number,
        maxPersonnel: number,
        wtank: Partial<number>,
        pumpcap: Partial<number>,
        schooling: object,
    
}