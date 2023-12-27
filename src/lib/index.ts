// place files you want to import through the `$lib` alias in this folder.
export const getVehicleDictionary = async () => {
    try {
        console.log("reading VehicleDictionary API");
        const res = await fetch("https://api.lss-manager.de/de_DE/vehicles");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};

export const getBuildingDictionary = async () => {
    try {
        console.log("reading BuildingDictionary API");
        const res = await fetch("https://api.lss-manager.de/de_DE/buildings");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};
