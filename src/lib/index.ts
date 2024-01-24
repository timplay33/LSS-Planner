import type {
	Building,
	Extension
} from '@lss-manager/missionchief-type-definitions/src/api/Building';
import type { BuildingDictionary, ExtensionDictionary, VehicleDictionary } from '../routes/types';
import type { Vehicle } from '@lss-manager/missionchief-type-definitions/src/api/Vehicle';

// place files you want to import through the `$lib` alias in this folder.
export function addSepDot(n: number) {
	return n.toLocaleString();
}

export function getBack() {
	history.back();
}

export function sortExtensions(building: Building) {
	let extentions: Array<Extension> = building.extensions.sort((a, b) =>
		a.caption.localeCompare(b.caption)
	);
	return extentions;
}
export function sortExtensionsDictionary(
	building: Building,
	buildingDictionary: Array<BuildingDictionary>
) {
	let extentionsDictionary: Array<ExtensionDictionary>;
	if (building?.building_type != undefined && buildingDictionary[0]?.extensions != undefined) {
		extentionsDictionary =
			buildingDictionary[building.building_type]?.extensions.sort((a, b) =>
				a.caption.localeCompare(b.caption)
			) || [];
		return extentionsDictionary;
	}
	return buildingDictionary[building?.building_type]?.extensions;
}

export function isExtensionPurchased(building: Building, extension: ExtensionDictionary) {
	const purchasedExtensions = [...sortExtensions(building)];
	let purchased: boolean = false;
	let i: number = 0;
	if (purchasedExtensions.length > 0) {
		while (i < purchasedExtensions.length) {
			if (purchasedExtensions[i].caption == extension.caption) {
				purchasedExtensions.shift();
				purchased = true;
				break;
			}
			i++;
		}
		return purchased;
	}
	return purchased;
}

export function calcLevelCost(
	local_building: Building,
	local_buildingDictionary: BuildingDictionary[]
) {
	let level_cost: number = 0;
	let level = local_building.level;
	if (level != 0) {
		for (let i = 1; i <= level; i++) {
			level_cost += local_buildingDictionary[local_building.building_type].levelPrices.credits[i];
		}
	}
	return level_cost;
}

export function calcRemainingLevelCost(
	local_building: Building,
	local_buildingDictionary: BuildingDictionary[]
) {
	let level_remaining_cost: number = 0;
	let level = local_building.level;
	let dictLevel = local_buildingDictionary[local_building.building_type].maxLevel - 1;
	if (level != 0 && dictLevel != 0) {
		for (let i = level; i <= dictLevel; i++) {
			level_remaining_cost +=
				local_buildingDictionary[local_building.building_type].levelPrices.credits[i];
		}
	}
	return level_remaining_cost;
}

export function calcExtensionCost(
	local_building: Building,
	local_buildingDictionary: BuildingDictionary[]
) {
	let extension_cost: number = 0;
	for (let extension of sortExtensionsDictionary(local_building, local_buildingDictionary)) {
		if (isExtensionPurchased(local_building, extension)) {
			extension_cost += local_buildingDictionary[local_building.building_type].extensions.filter(
				(e: ExtensionDictionary) => e?.caption == extension.caption
			)[0].credits;
		}
	}
	return extension_cost;
}

export function calcRemainingExtensionCost(
	local_building: Building,
	local_buildingDictionary: BuildingDictionary[]
) {
	let extension_remaining_cost: number = 0;
	for (let extension of sortExtensionsDictionary(local_building, local_buildingDictionary)) {
		if (!isExtensionPurchased(local_building, extension)) {
			extension_remaining_cost += local_buildingDictionary[
				local_building.building_type
			].extensions.filter((e: ExtensionDictionary) => e?.caption == extension.caption)[0].credits;
		}
	}
	return extension_remaining_cost;
}

export function calcVehicleCost(
	local_vehicles: Vehicle[],
	local_vehicleDictionary: VehicleDictionary[]
) {
	let vehicle_cost: number = 0;
	if (local_vehicles.length == 0) {
		return 0;
	} else if (local_vehicles.length == 1) {
		let vehicle = local_vehicles[0];
		vehicle_cost += local_vehicleDictionary[vehicle.vehicle_type].credits;
	} else {
		for (let vehicle of local_vehicles) {
			vehicle_cost += local_vehicleDictionary[vehicle.vehicle_type].credits;
		}
	}
	return vehicle_cost;
}
