// place files you want to import through the `$lib` alias in this folder.
export const getVehicleDictionary = async () => {
    try {
        const res = await fetch("http://localhost:5173/vehicles.json");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};

export const getBuildingDictionary = async () => {
    try {
        const res = await fetch("http://localhost:5173/buildings.json");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};
