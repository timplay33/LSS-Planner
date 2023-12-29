import type { Credits } from "@lss-manager/missionchief-type-definitions/src/api/Credits";

export type User = {
    session_id: string;
    credits: Partial<Credits>
}

export interface BuildingDictionary {
    [key: string]:{
        caption: string,
        color: string,
        coins: number,
        credits: number,
        levelPrices: {
            credits: Array<number>,
            coins: Array<number>,
        },
        extensions: Partial<Array<object>>,
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
}