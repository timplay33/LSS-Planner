import { json } from "@sveltejs/kit";

import BuildingsJson from "$lib/sampleData/buildings.json"

const buildingEntpoint = "https://www.leitstellenspiel.de/api/buildings"

export async function GET({ params}) {	
    if (params.sessionID == "0"){
        try {
            console.log("reading demo user buildings API");
            return json(BuildingsJson);
        }catch (err) {
            return  json([{"error": "error occurred trying to setup demo user"}]);
    }
    } else {

    const options = {
        method: 'GET',
        headers: {
            Cookie: "_session_id="+ params.sessionID,
        }
    };

    try {
        console.log("reading buildings API");
        const res = await fetch(buildingEntpoint, options);
        const resJson= await res.json();
        return json(resJson);
    }catch (err) {
        return  json([{"error": "invalid session id"}]);
}}}
