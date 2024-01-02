import { writable } from "svelte/store";
import { browser } from '$app/environment';

import type {  User } from "./types";
import type { Credits } from "@lss-manager/missionchief-type-definitions/src/api/Credits";


let storedUser:User= {session_id: ""};
if (browser) {
    if (localStorage.user != undefined) {
        storedUser= JSON.parse(localStorage.user);
        
    }   
}
export const user = writable(storedUser);
user.subscribe((value) => {
    if (browser) {
        localStorage.user = JSON.stringify(value);
    }
});

let storedCredits:Credits = {
    credits_user_current: 0,
    credits_user_total: 0,
    credits_alliance_current: 0,
    credits_alliance_total: 0,
    credits_alliance_active: false,
    user_name: "",
    user_id: 0,
    user_toplist_position: 0,
    user_directplay_registered: false,
    user_email_registered: false,
    user_facebook_registered: false,
    user_apple_registered: false,
    user_level: 0,
    user_level_title: "",
};
if (browser) {
    if (localStorage.credits != undefined) {
        storedCredits= JSON.parse(localStorage.credits);
    }   
}
export const credits = writable(storedCredits);
credits.subscribe((value) => {
    if (browser) {
        localStorage.credits = JSON.stringify(value);
    }
});
