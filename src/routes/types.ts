

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
        extensions: Array<ExtensionDictionary>,
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

/** Plan */

interface ExtensionPlan {
    caption: string;
    available: boolean;
    enabled: boolean;
    type_id: number;
}
export interface BuildingPlan {
    id?: number
    building_id : number | null,
    level: number,
    building_type: number,
    caption: string,
    address?: string,
    latitude?: number,
    longitude?: number,
    extensions: ExtensionPlan[],
    leitstelle_building_id: number | null,
    leitstelle_building_id_plan: number | null,
    small_building: boolean,
    personal_count_target: number,

}