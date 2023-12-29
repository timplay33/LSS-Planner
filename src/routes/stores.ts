import { writable } from "svelte/store";
import { browser } from '$app/environment';

import type { Building } from "@lss-manager/missionchief-type-definitions/src/api/Building";
import type { Vehicle } from "@lss-manager/missionchief-type-definitions/src/api/Vehicle";
import type { BuildingDictionary, User, VehicleDictionary } from "./types";


let storedUser:User= {session_id: "", credits: {},};
if (browser) {
    if (localStorage.user != undefined) {
        storedUser= JSON.parse(localStorage.user);
        if (storedUser.session_id != '' && !storedUser.credits?.user_id) {
			const res_credits = await fetch('/api/' + storedUser.session_id + '/credits');
			storedUser.credits =  await res_credits.json();
       }
    }   
}
export const user = writable(storedUser);
user.subscribe((value) => {
    if (browser) {
        localStorage.user = JSON.stringify(value);
    }
});

let storedVehicles: Array<Vehicle> = [];
if (browser) {
    if (localStorage.vehicles == undefined || localStorage.vehicles.length <= 2) {
        
        if (storedUser.session_id != '') {
			const res_vehicles = await fetch('/api/' + storedUser.session_id + '/vehicles');
			storedVehicles =  await res_vehicles.json();
           
        }
        
    }else {
        try {
            storedVehicles = JSON.parse(localStorage.vehicles);
        }
        catch (err) {
            localStorage.vehicles = undefined;
        }
} 
}
export const vehicles = writable(storedVehicles);
vehicles.subscribe((value) => {
    if (browser) {
        localStorage.vehicles = JSON.stringify(value);
    }
});

let storedVehicleDictionary: VehicleDictionary  = {};
if (browser) {
    if (localStorage.vehicleDictionary == undefined || localStorage.vehicleDictionary.length <= 2) {
        const res_vehicleDictionary= await fetch('https://api.lss-manager.de/de_DE/vehicles');
		storedVehicleDictionary  = await res_vehicleDictionary.json();
    }else {
        try {
            storedVehicleDictionary = JSON.parse(localStorage.vehicleDictionary);
        }
        catch (err) {
            localStorage.vehicleDictionary = undefined;
        }
} 
}
export const vehicleDictionary = writable(storedVehicleDictionary);
vehicleDictionary.subscribe((value) => {
    if (browser) {
        localStorage.vehicleDictionary = JSON.stringify(value);
    }
});

let storedBuildings: Array<Building> = [];
if (browser) {
    if (localStorage.buildings == undefined || localStorage.buildings.length <= 2) {
        if (storedUser.session_id != '') {
        const res_buildings = await fetch('/api/' + storedUser.session_id + '/buildings');
        storedBuildings = await res_buildings.json();
        }
    }else {
        try {
            storedBuildings = JSON.parse(localStorage.buildings);
        }
        catch (err) {
            localStorage.buildings = undefined;
        }
} 
}
export const buildings = writable(storedBuildings);
buildings.subscribe((value) => {
    if (browser) {
        localStorage.buildings = JSON.stringify(value);
    }
});

let storedBuildingDictionary:BuildingDictionary={};
if (browser) {
    if (localStorage.buildingDictionary == undefined || localStorage.buildingDictionary.length <= 2 ) {
        const res_buildingDictionary = await fetch('https://api.lss-manager.de/de_DE/buildings');
		storedBuildingDictionary = await res_buildingDictionary.json();
    }else {
        try {
            storedBuildingDictionary = JSON.parse(localStorage.buildingDictionary);
        }
        catch (err) {
            localStorage.buildingDictionary = undefined;
        }
} 
}
export const buildingDictionary = writable(storedBuildingDictionary);
buildingDictionary.subscribe((value) => {
    if (browser) {
        localStorage.buildingDictionary = JSON.stringify(value);
    }
});