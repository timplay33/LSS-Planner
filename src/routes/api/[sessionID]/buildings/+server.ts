import { json } from "@sveltejs/kit";

const buildingEntpoint = "https://www.leitstellenspiel.de/api/buildings"

export async function GET({ params}) {	

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
}}
