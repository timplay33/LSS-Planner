import { PUBLIC_SITE_URL } from "$env/static/public";

// place files you want to import through the `$lib` alias in this folder.
export const getVehicleDictionary = async () => {
    try {
        const res = await fetch(PUBLIC_SITE_URL+"vehicles.json");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};

export const getBuildingDictionary = async () => {
    try {
        const res = await fetch(PUBLIC_SITE_URL+"buildings.json");
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        console.error(err);
    }
};
