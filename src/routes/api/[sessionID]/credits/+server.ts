import { json } from "@sveltejs/kit";

const creditsEntpoint = "https://www.leitstellenspiel.de/api/credits"

export async function GET({ params}) {	

    const options = {
        method: 'GET',
        headers: {
            Cookie: "_session_id="+ params.sessionID,
        }
    };

    try {
        console.log("reading credits API");
        const res = await fetch(creditsEntpoint, options);
        const resJson= await res.json();
        return json(resJson);
    }catch (err) {
        console.error("error:",err);
        return  json({"error": "invalid session id"});
}}
