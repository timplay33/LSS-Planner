import { json } from "@sveltejs/kit";

const vehicleEntpoint = "https://www.leitstellenspiel.de/api/vehicles"

export async function GET({ params}) {	

    const options = {
        method: 'GET',
        headers: {
            Cookie: "_session_id="+ params.sessionID,
        }
    };

    try {
        console.log("reading vehicles API");
        const res = await fetch(vehicleEntpoint, options);
        const resJson= await res.json();
        return json(resJson);
    }catch (err) {
        return  json([{"error": "invalid session id"}]);
}}
