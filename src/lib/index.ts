// place files you want to import through the `$lib` alias in this folder.
export function addSepDot(n: number) {
    return n.toLocaleString();
}


export function sortExtensions(building) {
    let extentions = building.extensions.sort((a, b) => a.caption.localeCompare(b.caption));
    return extentions;
}
export function sortExtensionsDictionary(building , buildingDictionary) {
    let extentionsDictionary = buildingDictionary[building?.building_type]?.extensions.sort((a, b) =>
        a.caption.localeCompare(b.caption)
    );
    return extentionsDictionary;
}

export function isExtensionPurchased(building, extension) {
    const purchasedExtensions = sortExtensions(building);
    let purchased = false;
    let i = 0;
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