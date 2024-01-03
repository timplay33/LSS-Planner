import { json } from "@sveltejs/kit";

import VehiclesJson from "$lib/sampleData/vehicles.json"

const vehicleEntpoint = "https://www.leitstellenspiel.de/api/vehicles"

export async function GET({ params}) {	
    if (params.sessionID == "0"){
        try {
            console.log("reading demo user vehicles API");
            return json(VehiclesJson);
        }catch (err) {
            return  json({"error": "error occurred trying to setup demo user"});
        }

    }else{

        
        
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
        }
}}
