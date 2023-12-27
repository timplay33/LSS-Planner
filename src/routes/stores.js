import { writable } from "svelte/store";
import { browser } from '$app/environment';


let storedUser= {session_id: ""};
if (browser) {
    if (localStorage.user == undefined) {
        //storedSessionID = await getVehicles()
    }else {
        storedUser = JSON.parse(localStorage.user);
    }   
}
export const user = writable(storedUser);
user.subscribe((value) => {
    if (browser) {
        localStorage.user = JSON.stringify(value);
    }
});

let storedVehicles = {};
if (browser) {
    if (localStorage.vehicles == undefined) {
        //storedVehicles = await getVehicles()
    }else {
    storedVehicles = JSON.parse(localStorage.vehicles);
} 
}
export const vehicles = writable(storedVehicles);
vehicles.subscribe((value) => {
    if (browser) {
        localStorage.vehicles = JSON.stringify(value);
    }
});

let storedVehicleDictionary = {};
if (browser) {
    if (localStorage.vehicleDictionary == undefined) {
        //storedVehicleDictionary = await getVehicleDictionary();
    }else {
        storedVehicleDictionary = JSON.parse(localStorage.vehicleDictionary);
} 
}
export const vehicleDictionary = writable(storedVehicleDictionary);
vehicleDictionary.subscribe((value) => {
    if (browser) {
        localStorage.vehicleDictionary = JSON.stringify(value);
    }
});

let storedBuildings = {};
if (browser) {
    if (localStorage.buildings == undefined) {
        //storedBuildings = await getBuildings()
    }else {
        storedBuildings = JSON.parse(localStorage.buildings);
} 
}
export const buildings = writable(storedBuildings);
buildings.subscribe((value) => {
    if (browser) {
        localStorage.buildings = JSON.stringify(value);
    }
});

let storedBuildingDictionary={};
if (browser) {
    if (localStorage.buildingDictionary == undefined) {
        //storedBuildingDictionary = await getVehicleDictionary();
    }else {
        storedBuildingDictionary = JSON.parse(localStorage.buildingDictionary);
} 
}
export const buildingDictionary = writable(storedBuildingDictionary);
buildingDictionary.subscribe((value) => {
    if (browser) {
        localStorage.buildingDictionary = JSON.stringify(value);
    }
});