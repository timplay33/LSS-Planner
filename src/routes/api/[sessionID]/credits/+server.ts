import { json } from "@sveltejs/kit";

import CreditsJson from "$lib/sampleData/credits.json"

const creditsEntpoint = "https://www.leitstellenspiel.de/api/credits"

export async function GET({ params, fetch}) {	
    if (params.sessionID == "0"){
        try {
            console.log("reading demo user credits API");
            return json(CreditsJson);
        }catch (err) {
            return  json({"error": "error occurred trying to setup demo user", "msg": err.message});
        }
    }else {


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
            return  json({"error": "invalid session id"});
        }
    }
}
