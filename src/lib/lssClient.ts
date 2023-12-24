import { PRIVATE_COOKIE} from "$env/static/private";

const options = {
    method: 'GET',
    headers: {
        Cookie: PRIVATE_COOKIE,
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
        console.error(err);
    }
};