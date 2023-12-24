
import { getVehicles } from "$lib/lssClient";
import { supabase } from "$lib/supabaseClient";

export async function load() {
    //delete old data
    const vehicles_old = await supabase.from("vehicles").select();
    let vehicles_ids = vehicles_old.data.map(vehicle => vehicle.id);
    const del_old_data = await supabase.from("vehicles").delete().in("id", vehicles_ids);

    //get new data
    const vehicles = await getVehicles()

    //insert new data
    const { data, error } = await supabase.from("vehicles").insert(vehicles);
    return { data: data || [],
    error: error}

  }