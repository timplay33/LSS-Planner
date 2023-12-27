import { PRIVATE_SESSION_ID } from "$env/static/private";

const options = {
    method: 'GET',
    headers: {
        Cookie: "_session_id="+ PRIVATE_SESSION_ID,
    }
};

const vehicleEntpoint = "https://www.leitstellenspiel.de/api/vehicles"

export const getVehicles = async () => {
    try {
        console.log("reading vehicles API");
        const res = await fetch(vehicleEntpoint, options);
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        //console.error(err);
        return 1;
    }
};
const buildingEntpoint = "https://www.leitstellenspiel.de/api/buildings"

export const getBuildings = async () => {
    try {
        console.log("reading buildings API");
        const res = await fetch(buildingEntpoint, options);
        const resJson= await res.json();
        return resJson;
    }catch (err) {
        //console.error(err);
        return 1;
    }
};