import { getVehicleDictionary, getBuildingDictionary } from "$lib";
import { supabase } from "$lib/supabaseClient";

export async function load() {
  const vehicles = await supabase.from("vehicles").select().order("caption", { ascending: true });
  const buildings = await supabase.from("buildings").select().order("caption", { ascending: true });
  const vehicleDictionary = await getVehicleDictionary();
  const buildingDictionary = await getBuildingDictionary();
  return {
    vehicles: vehicles.data ?? [],
    vehicleDictionary: vehicleDictionary ?? [],
    buildings: buildings.data ?? [],
    buildingDictionary: buildingDictionary ?? [],
  };
}