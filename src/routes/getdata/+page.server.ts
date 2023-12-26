
import { getBuildings, getVehicles } from "$lib/lssClient";
import { supabase } from "$lib/supabaseClient";

export async function load() {

      //get new data
      const vehicles = await getVehicles()
      const buildings = await getBuildings()

      if (vehicles == 1 || buildings == 1) {
        return { data: null, error: "error: Getting data failed"}
      }

    //delete old data
    const vehicles_old = await supabase.from("vehicles").select();
    let vehicles_ids = vehicles_old.data.map(vehicle => vehicle.id);
    const del_old_vehicle_data = await supabase.from("vehicles").delete().in("id", vehicles_ids);

    const buildings_old = await supabase.from("buildings").select();
    let buildings_ids = buildings_old.data.map(building => building.id);
    const del_old_building_data = await supabase.from("buildings").delete().in("id", buildings_ids);




    //insert new data
    const resVehicles = await supabase.from("vehicles").insert(vehicles);
    const resBuildings = await supabase.from("buildings").insert(buildings);
    return { data: resVehicles.data && resBuildings.data || null,
    error: resVehicles.error && resBuildings.error};


  }