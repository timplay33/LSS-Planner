// place files you want to import through the `$lib` alias in this folder.
export const getVehicleDictionary = async () => {
    try {
        console.log("reading LSSM vehicles API (Dictionary)");
        const res = await fetch("https://api.lss-manager.de/de_DE/vehicles");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};
