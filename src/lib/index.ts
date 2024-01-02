import type { Building, Extension } from "@lss-manager/missionchief-type-definitions/src/api/Building";
import type { BuildingDictionary, ExtensionDictionary } from "../routes/types";

// place files you want to import through the `$lib` alias in this folder.
export function addSepDot(n: number) {
    return n.toLocaleString();
}


export function sortExtensions(building: Building) {
    let extentions:Array<Extension> = building.extensions.sort((a, b) => a.caption.localeCompare(b.caption));
    return extentions;
}
export function sortExtensionsDictionary(building: Building , buildingDictionary: Array<BuildingDictionary>) {
    let extentionsDictionary : Array<ExtensionDictionary> 
    if(building?.building_type != undefined && buildingDictionary[0].extensions != undefined) {
        extentionsDictionary = buildingDictionary[building.building_type].extensions.sort((a, b) =>
            a.caption.localeCompare(b.caption)
        );
        return extentionsDictionary
    }
    return  buildingDictionary[building?.building_type]?.extensions;
};

export function isExtensionPurchased(building : Building, extension: ExtensionDictionary) {
    const purchasedExtensions = sortExtensions(building);
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